# 🔄 Router Refactor Guide - Đồng Bộ Response Helpers

## 📋 Mục Tiêu

Đồng bộ tất cả routers để sử dụng `errorResponse` và `successResponse` helpers thay vì hardcode responses.

## ✅ Đã Refactor

Các file đã được refactor:
- ✅ `src/routers/taxDependent/create/create.router.ts`
- ✅ `src/routers/taxDependent/delete/deleteTaxDependentRouter.router.ts`
- ✅ `src/routers/product/product.router.ts`
- ✅ `src/routers/login/login.router.ts`
- ✅ `src/routers/errorOfReport/errorOfReport.router.ts`

## 🔄 Pattern Refactor

### Pattern 1: Error Response (400, 500)

**TRƯỚC:**
```typescript
return res.status(400).json({
    success: false,
    message: 'Error message',
});
```

**SAU:**
```typescript
import { errorResponse } from '../../helpers';

return errorResponse(res, 400, 'Error message');
```

### Pattern 2: Success Response với Data

**TRƯỚC:**
```typescript
return res.status(201).json({
    success: true,
    data: result.data,
});
```

**SAU:**
```typescript
import { successResponse } from '../../helpers';

return successResponse(res, 201, result.data);
```

### Pattern 3: Success Response với Message

**TRƯỚC:**
```typescript
return res.status(200).json({
    success: true,
    message: 'Success message',
});
```

**SAU:**
```typescript
return successResponse(res, 200, undefined, 'Success message');
```

### Pattern 4: Success Response với Data và Message

**TRƯỚC:**
```typescript
return res.status(201).json({
    success: true,
    data: result.data,
    message: 'Created successfully',
});
```

**SAU:**
```typescript
return successResponse(res, 201, result.data, 'Created successfully');
```

### Pattern 5: Catch Block

**TRƯỚC:**
```typescript
catch (error: any) {
    return res.status(500).json({
        success: false,
        message: 'server error: ' + error?.message,
    });
}
```

**SAU:**
```typescript
catch (error: any) {
    return errorResponse(res, 500, error?.message || 'Internal server error');
}
```

## 📝 Checklist Refactor

Cho mỗi router file, làm theo các bước:

- [ ] **Bước 1:** Import helpers
  ```typescript
  import { errorResponse, successResponse } from '../../helpers';
  ```

- [ ] **Bước 2:** Tìm và thay thế error responses
  - Tìm: `res.status(400|401|403|404|500).json({ success: false, ... })`
  - Tìm: `res.status(400|401|403|404|500).send({ success: false, ... })`
  - Thay bằng: `errorResponse(res, statusCode, message)`

- [ ] **Bước 3:** Tìm và thay thế success responses
  - Tìm: `res.status(200|201|202).json({ success: true, ... })`
  - Tìm: `res.status(200|201|202).send({ success: true, ... })`
  - Thay bằng: `successResponse(res, statusCode, data, message)`

- [ ] **Bước 4:** Đảm bảo có `return` statement
  - Thêm `return` trước mỗi response helper call

- [ ] **Bước 5:** Test lại endpoint

## 🎯 Status Code Mapping

| Use Case | Status Code | Helper |
|----------|------------|--------|
| Validation error | 400 | `errorResponse(res, 400, message)` |
| Unauthorized | 401 | `errorResponse(res, 401, message)` |
| Forbidden | 403 | `errorResponse(res, 403, message)` |
| Not found | 404 | `errorResponse(res, 404, message)` |
| Server error | 500 | `errorResponse(res, 500, message)` |
| Success (GET, PUT, DELETE) | 200 | `successResponse(res, 200, data, message?)` |
| Created (POST) | 201 | `successResponse(res, 201, data, message?)` |
| Accepted | 202 | `successResponse(res, 202, data, message?)` |

## ⚠️ Lưu Ý Đặc Biệt

### 1. Login Router (có token riêng)
```typescript
// Giữ nguyên vì có field token riêng
return res.status(202).json({
    success: true,
    data: token?.data,
    token: token?.token,
});
```

### 2. Response với fields đặc biệt
Nếu response có fields ngoài `success`, `data`, `message`, giữ nguyên custom response.

### 3. `.send()` vs `.json()`
- Tất cả nên dùng `.json()` (helpers đã dùng `.json()`)
- Nếu có `.send()`, thay bằng helpers

## 🔍 Tìm Files Cần Refactor

Sử dụng grep để tìm:
```bash
# Tìm các file có hardcode error response
grep -r "res.status(.*).json({.*success: false" src/routers/

# Tìm các file có hardcode success response
grep -r "res.status(.*).json({.*success: true" src/routers/
```

## 📊 Tiến Độ

- **Tổng số router files:** ~112 files
- **Đã refactor:** 5 files
- **Còn lại:** ~107 files

## 🚀 Script Tự Động (Optional)

Có thể tạo script để tự động refactor, nhưng khuyến nghị refactor thủ công để:
- Đảm bảo logic đúng
- Xử lý edge cases
- Test kỹ từng endpoint

## ✅ Best Practices

1. **Luôn dùng helpers** thay vì hardcode
2. **Status code đúng** cho từng use case
3. **Message rõ ràng** cho error cases
4. **Test sau khi refactor** mỗi endpoint
5. **Commit từng file** để dễ rollback nếu cần

## 📚 Xem Thêm

- `src/helpers/responeHandle/README.md` - Chi tiết về helpers
- `src/routers/taxDependent/create/create.router.ts` - Ví dụ đã refactor

