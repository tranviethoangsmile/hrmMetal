# Response Helpers - Hướng Dẫn Sử Dụng

## 📋 Tổng Quan

Hai helper functions để xử lý response một cách nhất quán:
- `errorResponse` - Trả về error response
- `successResponse` - Trả về success response

## 🚀 Cách Sử Dụng

### errorResponse

```typescript
import { errorResponse } from '@/helpers';

// Cơ bản
errorResponse(res, 400, 'ID is required');

// Với default statusCode (500)
errorResponse(res, undefined, 'Internal server error');
// Hoặc
errorResponse(res, 500, 'Internal server error');
```

**Response:**
```json
{
    "success": false,
    "message": "ID is required"
}
```

### successResponse

```typescript
import { successResponse } from '@/helpers';

// Chỉ có message
successResponse(res, 200, undefined, 'Deleted successfully');
// Hoặc
successResponse(res, undefined, undefined, 'Deleted successfully');

// Chỉ có data
successResponse(res, 200, { id: '123', name: 'John' });

// Có cả data và message
successResponse(res, 201, { id: '123' }, 'Created successfully');

// Chỉ success (không có data, không có message)
successResponse(res, 200);
```

**Response Examples:**

1. Chỉ message:
```json
{
    "success": true,
    "message": "Deleted successfully"
}
```

2. Chỉ data:
```json
{
    "success": true,
    "data": {
        "id": "123",
        "name": "John"
    }
}
```

3. Cả data và message:
```json
{
    "success": true,
    "data": {
        "id": "123"
    },
    "message": "Created successfully"
}
```

4. Chỉ success:
```json
{
    "success": true
}
```

## 📝 Ví Dụ Trong Router

```typescript
import { Router, Request, Response } from 'express';
import { errorResponse, successResponse } from '@/helpers';
import { deleteController } from '@/controllers';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id;
        
        // Validation
        if (!id) {
            return errorResponse(res, 400, 'ID is required');
        }

        // Business logic
        const result = await deleteController(id);
        
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Delete failed');
        }

        // Success response
        return successResponse(res, 200, undefined, 'Deleted successfully');
        
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
```

## ✅ Best Practices

1. **Luôn dùng helpers** thay vì hardcode response
2. **Status code đúng**: 
   - 200: Success (GET, PUT, DELETE)
   - 201: Created (POST)
   - 400: Bad Request (Validation errors)
   - 404: Not Found
   - 500: Internal Server Error
3. **Message rõ ràng** cho error cases
4. **Data optional** - chỉ thêm khi cần
5. **Message optional** - chỉ thêm khi cần

## 🎯 So Sánh

**TRƯỚC (Hardcode):**
```typescript
return res.status(200).json({
    success: true,
    message: 'Deleted successfully',
});
```

**SAU (Dùng Helper):**
```typescript
return successResponse(res, 200, undefined, 'Deleted successfully');
```

**Lợi ích:**
- ✅ Nhất quán format
- ✅ Dễ maintain
- ✅ Code gọn hơn
- ✅ Dễ refactor sau này

