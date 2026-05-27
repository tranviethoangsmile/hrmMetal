---
name: hrm-backend
description: Hướng dẫn thiết kế và viết code cho backend hrmMetal (Node.js + TypeScript + Express + Sequelize + PostgreSQL). Dùng skill này bất cứ khi nào cần thêm module mới, viết API endpoint, tạo model, repository, useCase, controller, hoặc router cho hệ thống HRM nhà máy kim loại. Bắt buộc đọc khi người dùng yêu cầu: "thêm chức năng", "tạo API", "viết model", "làm module mới" cho backend.
---

# HRM Metal — Backend Skill

## Tech Stack
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **ORM**: Sequelize v6 + PostgreSQL
- **Auth**: JWT (jsonwebtoken)
- **Cache**: Redis (ioredis) + BullMQ queue
- **Storage**: Cloudinary (images/videos)
- **Notification**: Firebase FCM + Nodemailer
- **AI**: OpenAI API
- **Realtime**: Socket.IO
- **Docs**: Swagger (swagger-jsdoc)

---

## Kiến trúc phân lớp (bắt buộc tuân thủ)

```
Router → UseCase → Controller → Repository → Model
```

Mỗi module có **5 lớp riêng biệt**:

| Lớp | Thư mục | Vai trò |
|---|---|---|
| Model | `src/models/` | Sequelize model, định nghĩa bảng DB |
| Repository | `src/repositorys/` | Truy vấn DB trực tiếp, trả `{success, data, message}` |
| UseCase | `src/useCases/` | Business logic, validate, xử lý, gọi repository |
| Controller | `src/controllers/` | Delegate đến useCase, không có logic |
| Router | `src/routers/` | HTTP handlers, gọi controller, trả response |

---

## Patterns chuẩn

### 1. Model (Sequelize)
```typescript
// src/models/tenModule.model.ts
import { Model, DataTypes } from 'sequelize';
import { db } from '../dbs';

class TenModule extends Model {
    public id!: string;
    public field1!: string;
    public is_active!: boolean;
    public user_id!: string;
    // FK relations khai báo dưới đây
}

TenModule.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        field1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'ten_module',
        tableName: 'ten_modules',    // luôn dùng snake_case, số nhiều
        timestamps: true,
        paranoid: true,              // soft delete
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default TenModule;
```

**Quy tắc Model:**
- UUID v4 cho primary key
- `paranoid: true` cho soft delete
- `timestamps: true` với `created_at`, `updated_at`, `deleted_at`
- Dùng ENUM từ `src/enum/` (không hardcode string)
- BelongsTo/HasMany khai báo trong `src/models/index.ts`

---

### 2. Repository
```typescript
// src/repositorys/tenModule/tenModule.repository.ts
import { TenModule, User } from '../../models';

class TenModuleRepository {
    async create(data: any) {
        try {
            const result = await TenModule.create({ ...data });
            return { success: true, data: result };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }

    async search(field: any) {
        try {
            const result = await TenModule.findAll({
                where: { ...field },
                include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar'] }],
            });
            return { success: true, data: result };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }

    async update(field: any) {
        try {
            await TenModule.update({ ...field }, { where: { id: field.id } });
            return { success: true };
        } catch (error: any) {
            return { success: false, message: `repo: ${error.message}` };
        }
    }

    async destroy(id: string) {
        try {
            await TenModule.destroy({ where: { id } });
            return { success: true };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }
}

export { TenModuleRepository };
```

**Quy tắc Repository:**
- Luôn wrap trong try/catch
- Return `{ success: true, data }` hoặc `{ success: false, message }`
- Không có business logic ở đây — chỉ DB queries
- Prefix lỗi từ repo: `` `repo: ${error.message}` ``

---

### 3. UseCase
```typescript
// src/useCases/tenModule/tenModule.useCase.ts
import { TenModuleRepository } from '../../repositorys';
import { validation_id } from '../../validates';    // validate dùng joi/zod
import { setCache, getCache, delCache } from '../../utils';

const tenModuleRepo = new TenModuleRepository();
const CACHE_KEY = 'ten_module';

const createTenModuleUse = async (data: any) => {
    try {
        // 1. Validate
        if (!data.field1) throw new Error('field1 is required');
        
        // 2. Business logic
        const result = await tenModuleRepo.create(data);
        if (!result?.success) throw new Error(result?.message);
        
        // 3. Invalidate cache nếu có
        await delCache(`${CACHE_KEY}:${data.user_id}`);
        
        return { success: true, data: result.data };
    } catch (error: any) {
        return { success: false, message: `useCase :: ${error.message}` };
    }
};

const searchTenModuleUse = async (field: any) => {
    try {
        // Check cache trước
        const cached = await getCache(`${CACHE_KEY}:${field.user_id}`);
        if (cached) return { success: true, data: cached };
        
        const result = await tenModuleRepo.search(field);
        if (!result?.success) throw new Error(result?.message);
        
        // Set cache 5 phút
        await setCache(`${CACHE_KEY}:${field.user_id}`, result.data, 300);
        
        return { success: true, data: result.data };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export { createTenModuleUse, searchTenModuleUse };
```

---

### 4. Controller
```typescript
// src/controllers/tenModule/tenModule.controller.ts
import { createTenModuleUse, searchTenModuleUse } from '../../useCases';

const createTenModuleControll = async (data: any) => {
    return await createTenModuleUse(data);
};

const searchTenModuleControll = async (field: any) => {
    return await searchTenModuleUse(field);
};

export { createTenModuleControll, searchTenModuleControll };
```

**Quy tắc Controller:**
- Chỉ delegate đến useCase — không có logic gì thêm
- Đặt tên: `[action][ModuleName]Controll`

---

### 5. Router
```typescript
// src/routers/tenModule/tenModule.router.ts
import { Request, Response, Router } from 'express';
import { createTenModuleControll, searchTenModuleControll } from '../../controllers';
import { errorResponse, successResponse } from '../../helpers';

const tenModuleRouter: Router = Router();

tenModuleRouter.post('/create', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (!data.field1 || !data.user_id) {
            return errorResponse(res, 400, 'Missing required fields: field1, user_id');
        }
        const result = await createTenModuleControll(data);
        if (!result?.success) {
            return errorResponse(res, 200, result?.message || 'Create failed');
        }
        return successResponse(res, 201, result?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

tenModuleRouter.post('/search', async (req: Request, res: Response) => {
    try {
        const field = req.body;
        const result = await searchTenModuleControll(field);
        if (!result?.success) {
            return errorResponse(res, 200, result?.message || 'Not found');
        }
        return successResponse(res, 200, result?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default tenModuleRouter;
```

**Quy tắc Router:**
- Dùng `errorResponse(res, statusCode, message)` và `successResponse(res, statusCode, data)`
- Validate input đơn giản ở đây, validate phức tạp trong useCase
- Endpoint naming: động từ ngắn gọn `/create`, `/search`, `/update`, `/delete`, `/getall`
- **Lỗi business** (dữ liệu không hợp lệ) → `errorResponse(res, 200, message)` ← đây là convention của dự án
- **Lỗi hệ thống** (exception) → `errorResponse(res, 500, message)`

---

## Đăng ký module mới

### Thêm vào index exports
```typescript
// src/controllers/index.ts — thêm export
export * from './tenModule/tenModule.controller';

// src/useCases/index.ts — thêm export
export * from './tenModule/tenModule.useCase';

// src/repositorys/index.ts — thêm export
export { TenModuleRepository } from './tenModule/tenModule.repository';

// src/models/index.ts — thêm export và associations
export { default as TenModule } from './tenModule.model';
// Sau đó khai báo BelongsTo nếu cần:
// TenModule.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
```

### Thêm vào router chính
```typescript
// src/routers/index.ts hoặc server.ts
import tenModuleRouter from './tenModule/tenModule.router';
app.use(`${API}${VERSION}${V1}/ten-module`, tenModuleRouter);
```

---

## Enums có sẵn

```typescript
// src/enum/Role.enum.ts
enum Role { STAFF, LEADER, SUPERVISOR, MANAGER, ADMIN }

// src/enum/Position.enum.ts
enum Position { HINO, IZUMO, KYOTO, OSAKA, TOKYO, COMPORATION }

// src/enum/shift_work.enum.ts
enum shift_work { DAY, NIGHT }

// src/enum/shift.enum.ts — ca cụ thể (A, B...)
// src/enum/product.enum.ts — loại sản phẩm
```

---

## Response Format chuẩn

```json
// Success
{ "success": true, "data": {...}, "statusCode": 200 }

// Error
{ "success": false, "message": "...", "statusCode": 400 }
```

---

## Checklist khi thêm module mới

- [ ] Tạo model trong `src/models/` với UUID + paranoid + timestamps
- [ ] Thêm associations trong `src/models/index.ts`
- [ ] Tạo repository class trong `src/repositorys/`
- [ ] Tạo useCase functions trong `src/useCases/`
- [ ] Tạo controller (chỉ delegate) trong `src/controllers/`
- [ ] Tạo router với validate + errorResponse/successResponse
- [ ] Export tất cả trong các file `index.ts` tương ứng
- [ ] Đăng ký router trong server/app
- [ ] Thêm Swagger doc (optional nhưng khuyến khích)
