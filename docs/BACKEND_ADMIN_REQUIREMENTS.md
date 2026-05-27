# Yeu cau Backend de hoan thien Admin Page HRM Metal

Tai lieu nay duoc viet theo vai tro PM/Product Owner, dua tren code backend hien tai va file `docs/ADMIN_FRONTEND_SPEC.md`. Muc tieu la xac dinh nhung chuc nang va API can bo sung/chuan hoa de Front End co the xay dung trang Admin day du, de bao tri va on dinh hon.

## 1. Muc tieu san pham

Admin Page can giup nguoi quan tri van hanh toan bo he thong HRM Metal:

- Quan ly nhan vien, phong ban, role, position.
- Theo doi cham cong, nghi phep, tang ca, ngay nghi.
- Quan ly bang luong va du lieu phu cap/khau tru.
- Quan ly ke hoach san xuat, bao cao san xuat, loi san xuat, ton kho.
- Quan ly su kien, safety check, bao cao an toan.
- Quan ly nguoi phu thuoc thue va muc ho tro.
- Quan ly dat com, dong phuc, notification va noi dung noi bo.
- Cung cap dashboard tong hop, filter, export va audit log.

## 2. Van de BE hien tai can cai thien

### P0 - Can xu ly truoc khi FE Admin hoan thien

1. Thieu API dashboard tong hop.
2. Nhieu API list/search khong co pagination/sort/filter thong nhat.
3. Nhieu route admin check quyen bang `user_id` trong body, de loi va kem bao mat.
4. Response loi nghiep vu co luc tra HTTP `200` voi `success:false`, FE kho xu ly chuan.
5. Mot so route trung path hoac ambiguous, vi du `uniformorder/search` dung cho nhieu kieu search.
6. Chua co API option/rut gon cho select box: users, departments, products, roles, positions.
7. Thieu audit log cho hanh dong quan trong: approve, delete, update salary, update user.
8. Chua co export report cho payroll, daily report, attendance, leave, overtime.

### P1 - Nen lam de Admin dung tot trong thuc te

1. Chuan hoa authorization bang JWT middleware + role guard.
2. Bo sung bulk API cho payroll, plan production, notification.
3. Bo sung endpoint count/summary theo tung module.
4. Bo sung upload API thong nhat cho media/avatar/document.
5. Bo sung soft-delete restore va active/inactive cho cac master data quan trong.
6. Bo sung validation theo enum that su, thay vi chi `Joi.string()`.

### P2 - Nang cao

1. Realtime admin notification qua Socket.IO.
2. Import Excel/CSV cho user, payroll, plan production, inventory.
3. Report builder theo filter tuy bien.
4. Versioning/audit diff cho record nhay cam.

## 3. Nguyen tac API moi

Moi API moi nen theo cac quy uoc:

### Response thanh cong

```json
{
  "success": true,
  "data": {},
  "message": "optional"
}
```

### Response loi

```json
{
  "success": false,
  "message": "Human readable error",
  "code": "ERROR_CODE",
  "details": {}
}
```

### Pagination

Tat ca API list/search admin nen nhan:

```json
{
  "page": 1,
  "limit": 20,
  "sort_by": "created_at",
  "sort_order": "desc",
  "filters": {}
}
```

Va tra:

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "total_pages": 5
    }
  }
}
```

### Auth

Tat ca API admin nen dung:

```txt
Authorization: Bearer <token>
```

Khong nen yeu cau `user_id` admin trong body de check role. User thuc hien action nen lay tu decoded token.

## 4. Backlog API can lam

## Epic A - Dashboard Admin

### A1. Dashboard summary

Priority: P0

Endpoint:

```txt
GET /api/version/v1/admin/dashboard/summary
```

Response can co:

```json
{
  "employee_total": 120,
  "employee_active": 110,
  "pending_paid_leave": 5,
  "pending_overtime_leader": 3,
  "pending_overtime_admin": 2,
  "pending_safety_report": 4,
  "today_orders": 80,
  "today_checkins": 95,
  "today_absent": 10,
  "inventory_low_count": 3
}
```

Acceptance criteria:

- Chi admin/manager duoc xem.
- So lieu tinh theo ngay hien tai timezone `+09:00`.
- Response duoi 1 giay voi du lieu production binh thuong.

### A2. Dashboard charts

Priority: P0

Endpoint:

```txt
POST /api/version/v1/admin/dashboard/charts
```

Payload:

```json
{
  "start_date": "2026-05-01",
  "end_date": "2026-05-31",
  "department_id": "uuid",
  "position": "HINO"
}
```

Response can co:

- Attendance by date.
- Daily production quantity/good/defective.
- Overtime hours by department.
- Paid leave count by status.
- Safety report count by status.

Acceptance criteria:

- Filter optional tru `start_date`, `end_date`.
- FE co the ve line/bar/pie chart truc tiep tu response.

## Epic B - Option APIs cho Form Select

### B1. User options

Priority: P0

Endpoint:

```txt
GET /api/version/v1/admin/options/users?keyword=&department_id=&position=&role=&is_active=true
```

Response item:

```json
{
  "id": "uuid",
  "employee_id": 1001,
  "name": "Nguyen Van A",
  "user_name": "nva",
  "department_id": "uuid",
  "department_name": "Production",
  "position": "HINO",
  "role": "STAFF"
}
```

Acceptance criteria:

- Ho tro keyword theo name/user_name/employee_id.
- Limit mac dinh 50 de select search nhanh.

### B2. Department options

Priority: P0

Endpoint:

```txt
GET /api/version/v1/admin/options/departments
```

Response item:

```json
{
  "id": "uuid",
  "name": "Production"
}
```

### B3. System enum options

Priority: P0

Endpoint:

```txt
GET /api/version/v1/admin/options/enums
```

Response can co:

```json
{
  "roles": ["STAFF", "LEADER", "SUPERVISOR", "MANAGER", "ADMIN"],
  "positions": ["HINO", "IZUMO", "KYOTO", "OSAKA", "TOKYO", "COMPORATION"],
  "products": [],
  "work_shifts": ["DAY", "NIGHT"],
  "shifts": ["A", "B"],
  "notification_types": ["INFO", "WARNING", "ERROR", "SUCCESS", "SYSTEM"],
  "uniform_types": [],
  "uniform_sizes": [],
  "tax_dependent_statuses": ["PENDING", "APPROVED", "REJECTED"]
}
```

Acceptance criteria:

- Lay tu enum backend, khong hard-code rieng trong controller.
- FE chi can goi 1 lan khi load app/admin.

## Epic C - Chuan hoa List/Search Admin

### C1. Users admin search

Priority: P0

Endpoint:

```txt
POST /api/version/v1/admin/users/search
```

Payload:

```json
{
  "page": 1,
  "limit": 20,
  "sort_by": "created_at",
  "sort_order": "desc",
  "filters": {
    "keyword": "nguyen",
    "department_id": "uuid",
    "position": "HINO",
    "role": "STAFF",
    "is_active": true,
    "is_offical_staff": true
  }
}
```

Acceptance criteria:

- Khong tra password.
- Co include department.
- Search keyword theo name, user_name, email, employee_id, phone.

### C2. Attendance admin search

Priority: P0

Endpoint:

```txt
POST /api/version/v1/admin/checkins/search
```

Payload:

```json
{
  "page": 1,
  "limit": 50,
  "filters": {
    "start_date": "2026-05-01",
    "end_date": "2026-05-31",
    "user_id": "uuid",
    "department_id": "uuid",
    "position": "HINO",
    "work_shift": "DAY",
    "is_checked": true,
    "is_paid_leave": false
  }
}
```

Acceptance criteria:

- Tra user summary kem moi checkin.
- Co summary: total_work_time, total_overtime, total_paid_leave_days.

### C3. Leave admin search

Priority: P0

Endpoint:

```txt
POST /api/version/v1/admin/paid-leaves/search
```

Filters:

```txt
user_id, leader_id, department_id, position, date_from, date_to,
is_confirm, is_approve, is_paid, is_half
```

Acceptance criteria:

- Co user va leader summary.
- Co status computed: PENDING_LEADER, PENDING_ADMIN, APPROVED, REJECTED.

### C4. Overtime admin search

Priority: P0

Endpoint:

```txt
POST /api/version/v1/admin/overtime-requests/search
```

Filters:

```txt
user_id, leader_id, admin_id, department_id, position, date_from, date_to,
is_confirm, is_approved
```

Acceptance criteria:

- Co status computed.
- Co total_overtime_hours trong response summary.

### C5. Payroll admin search

Priority: P0

Endpoint:

```txt
POST /api/version/v1/admin/payrolls/search
```

Filters:

```txt
user_id, department_id, position, month, date_from, date_to, is_active
```

Acceptance criteria:

- Co user summary.
- Co totals: gross_salary, net_salary, deduction_total, allowance_total.

### C6. Production report admin search

Priority: P0

Endpoint:

```txt
POST /api/version/v1/admin/daily-reports/search
```

Filters:

```txt
department_id, user_id, product, shift, date_from, date_to
```

Acceptance criteria:

- Co totals: quantity, good_quantity, defective_quantity, shutdown_time, operated_time.
- Include errors count.

## Epic D - Workflow phe duyet

### D1. Approve/reject paid leave thong nhat

Priority: P0

Endpoint:

```txt
POST /api/version/v1/admin/paid-leaves/:id/decision
```

Payload:

```json
{
  "action": "APPROVE",
  "feedback": "Approved",
  "is_paid": true
}
```

Action:

```txt
CONFIRM, APPROVE, REJECT
```

Acceptance criteria:

- User thao tac lay tu JWT.
- Kiem tra role/permission.
- Ghi audit log.
- Tra record moi nhat.

### D2. Approve/reject overtime thong nhat

Priority: P0

Endpoint:

```txt
POST /api/version/v1/admin/overtime-requests/:id/decision
```

Payload:

```json
{
  "action": "APPROVE",
  "feedback": "OK"
}
```

Action:

```txt
CONFIRM, APPROVE, REJECT
```

Can bo sung field BE neu hien chua co:

- `feedback`
- `rejected_by`
- `rejected_at`
- `approved_at`
- `confirmed_at`

### D3. Confirm safety report

Priority: P1

Endpoint:

```txt
POST /api/version/v1/admin/safety-reports/:id/decision
```

Payload:

```json
{
  "action": "CONFIRM",
  "corrective_action": "..."
}
```

Acceptance criteria:

- Ghi `leader_id` tu JWT.
- Luu audit log.

### D4. Tax dependent status decision

Priority: P1

Endpoint:

```txt
POST /api/version/v1/admin/tax-dependents/:id/decision
```

Payload:

```json
{
  "status": "APPROVED",
  "notes": "Valid documents"
}
```

Acceptance criteria:

- Chi ADMIN/HR role duoc xu ly.
- Ghi audit log.

## Epic E - Export / Import

### E1. Export payroll

Priority: P1

Endpoint:

```txt
POST /api/version/v1/admin/payrolls/export
```

Payload dung filter nhu payroll search.

Response:

```json
{
  "file_url": "https://...",
  "file_name": "payroll-2026-05.xlsx"
}
```

Acceptance criteria:

- Export XLSX.
- Cot theo payroll model.
- Co tong cuoi file.

### E2. Export attendance

Priority: P1

Endpoint:

```txt
POST /api/version/v1/admin/checkins/export
```

### E3. Export daily report

Priority: P1

Endpoint:

```txt
POST /api/version/v1/admin/daily-reports/export
```

### E4. Import payroll

Priority: P2

Endpoint:

```txt
POST /api/version/v1/admin/payrolls/import
```

Content type:

```txt
multipart/form-data
```

Acceptance criteria:

- Validate tung dong.
- Neu co loi, tra danh sach dong loi.
- Co dry-run mode.

## Epic F - Audit Log

### F1. Tao bang audit_logs

Priority: P0

Model de xuat:

```txt
id, actor_user_id, action, resource_type, resource_id, before_data,
after_data, ip_address, user_agent, created_at
```

Resource type:

```txt
USER, PAYROLL, PAID_LEAVE, OVERTIME_REQUEST, SAFETY_REPORT,
TAX_DEPENDENT, DEPENDENT_SUPPORT_AMOUNT, INVENTORY, PLAN_PRODUCTION
```

### F2. Audit log search

Priority: P1

Endpoint:

```txt
POST /api/version/v1/admin/audit-logs/search
```

Filters:

```txt
actor_user_id, action, resource_type, resource_id, date_from, date_to
```

Acceptance criteria:

- Pagination.
- Sort newest first.
- Khong cho sua/xoa audit log qua API admin.

## Epic G - Media va upload

### G1. Upload media chung

Priority: P1

Endpoint:

```txt
POST /api/version/v1/admin/media/upload
```

Content type:

```txt
multipart/form-data
```

Payload:

```txt
file, folder?, resource_type?
```

Response:

```json
{
  "url": "https://...",
  "public_id": "...",
  "resource_type": "image",
  "format": "jpg",
  "bytes": 12345
}
```

### G2. Delete media chung

Priority: P1

Endpoint:

```txt
DELETE /api/version/v1/admin/media
```

Payload:

```json
{
  "public_id": "cloudinary-public-id"
}
```

Acceptance criteria:

- Chi xoa media ma he thong quan ly.
- Ghi audit log.

## Epic H - Bulk operations

### H1. Bulk create/update plan production

Priority: P1

Endpoint:

```txt
POST /api/version/v1/admin/plan-productions/bulk-upsert
```

Payload:

```json
{
  "items": [
    {
      "department_id": "uuid",
      "date": "2026-05-22",
      "quantity": 100,
      "product": "D59P",
      "position": "HINO",
      "operation_time": 1.5,
      "work_shift": "DAY",
      "production_line": "Line 1",
      "is_custom": false
    }
  ]
}
```

### H2. Bulk create notification

Priority: P1

Endpoint:

```txt
POST /api/version/v1/admin/notifications/bulk-create
```

Payload:

```json
{
  "target": {
    "user_ids": ["uuid"],
    "department_id": "uuid",
    "position": "HINO",
    "role": "STAFF"
  },
  "title": "Notice",
  "message": "Message",
  "type": "INFO",
  "push": true
}
```

Acceptance criteria:

- Co the gui cho nhieu user.
- Neu `push=true`, tao notification va push FCM neu co token.

## Epic I - Chuan hoa route hien co

Priority: P0

Can lam:

1. Chuyen cac route `POST /module/search` ambiguous thanh route ro nghia.
2. Route list nen dung `POST /admin/<resource>/search` neu filter phuc tap.
3. Route detail nen dung `GET /admin/<resource>/:id`.
4. Route delete nen dung `DELETE /admin/<resource>/:id`.
5. Route update nen dung `PATCH /admin/<resource>/:id`.

Vi du mapping:

```txt
POST /uniformorder/search -> POST /admin/uniform-orders/search
POST /payroll/searchbyid -> GET /admin/payrolls/:id
POST /dayoffs/deletebyid -> DELETE /admin/day-offs/:id
POST /events/searchbyid -> GET /admin/events/:id
```

Acceptance criteria:

- Giua lai route cu trong 1-2 phien ban de khong lam hong app hien tai.
- Them route moi song song, document trong Swagger.

## 5. Non-functional requirements

### Security

- Tat ca API admin bat buoc JWT.
- Role guard theo resource/action.
- Khong tra password/hash trong bat ky response admin nao.
- Validate input theo enum, UUID, date.
- Log action nhay cam.

### Performance

- List API phai pagination.
- Cac dashboard query can index cac cot: `created_at`, `date`, `user_id`, `department_id`, `position`, status flags.
- Endpoint dashboard nen response trong 1 giay voi du lieu 1 nam.

### Observability

- Log request id cho API admin.
- Log error co stack trong server, response FE chi can message/code.
- Them error code on dinh: `VALIDATION_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `INTERNAL_ERROR`.

## 6. Roadmap de trien khai

### Phase 1 - Admin chay duoc end-to-end

Priority: P0

- Dashboard summary/chart.
- Options APIs.
- Search/list pagination cho users, checkins, leave, overtime, payroll, daily reports.
- JWT role guard thay cho body `user_id` admin.
- Audit log model + ghi log cho approve/delete/update salary.

### Phase 2 - Van hanh tot

Priority: P1

- Export payroll/checkins/daily reports.
- Bulk notification.
- Bulk plan production.
- Media upload/delete chung.
- Decision APIs thong nhat cho leave/OT/safety/tax dependent.

### Phase 3 - Nang cao

Priority: P2

- Import Excel.
- Realtime dashboard/notification.
- Report builder.
- Versioning/audit diff day du.

## 7. Definition of Done

Mot API duoc xem la hoan thanh khi:

- Co route/controller/useCase/repository tach ro.
- Co validation request.
- Co role guard.
- Co Swagger document.
- Co response success/error theo chuan.
- Co pagination neu la list.
- Co test manual bang Postman/Swagger hoac automated test neu project bo sung test.
- Khong pha route cu dang dung.
- FE co the dung API ma khong can suy luan logic phia client qua nhieu endpoint khac nhau.

