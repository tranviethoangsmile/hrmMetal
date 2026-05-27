# Tai lieu Front End cho trang Admin HRM Metal

Tai lieu nay duoc tong hop truc tiep tu code backend trong `src/routers`, `src/models`, `src/validates`, `src/enum`, middleware va helper response. Muc tieu la giup Front End co du can cu de xay dung mot trang admin hoan chinh, gom dashboard, danh muc, form, filter, thao tac duyet/xac nhan va tich hop API.

## 1. Tong quan he thong

Backend la Express + TypeScript, dung Sequelize/PostgreSQL cho phan lon nghiep vu, Cloudinary cho upload media, Redis/Socket.IO/FCM cho realtime va push notification.

Base URL API:

```txt
/api/version/v1
```

Swagger duoc gan vao app trong `src/swagger/swagger.config.ts`. Khi server chay, FE nen mo Swagger cua moi truong backend de doi chieu request/response chi tiet neu can.

Quy uoc response chuan:

```json
{
  "success": true,
  "data": {},
  "message": "optional"
}
```

```json
{
  "success": false,
  "message": "error message"
}
```

Luu y quan trong:

- Co nhieu loi nghiep vu tra HTTP `200` nhung `success: false`; FE khong duoc chi dua vao HTTP status.
- API bi rate limit `100 request/phut/IP`.
- Date nen gui theo ISO `yyyy-mm-dd`.
- Upload file dung `multipart/form-data`; middleware se upload Cloudinary va chen `media_path` vao `req.body`.
- Mot so route admin check quyen bang `user_id` trong body, khong phai chi bang JWT.

## 2. Auth va session

### Dang nhap

Endpoint:

```txt
POST /api/version/v1/login
```

Payload:

```json
{
  "user_name": "admin",
  "password": "password"
}
```

Response thanh cong gom:

- `data`: thong tin user dang nhap.
- `token`: JWT.

FE nen luu:

- `token`: gui vao `Authorization: Bearer <token>` cho cac API co middleware token, dac biet order com.
- `currentUser`: `id`, `name`, `user_name`, `role`, `position`, `department_id`, `department`, `is_admin`, `is_officer`, `is_offical_staff`, `employee_id`, cac thong tin luong co ban.

Role:

```txt
STAFF, LEADER, SUPERVISOR, MANAGER, ADMIN
```

Position:

```txt
HINO, IZUMO, KYOTO, OSAKA, TOKYO, COMPORATION
```

Quyen UI de xuat:

- `ADMIN`: toan quyen quan tri, duyet OT, cap nhat nguoi phu thuoc, cau hinh ngay nghi, luong.
- `MANAGER`, `SUPERVISOR`, `LEADER`: xem va xu ly cac request theo phong ban/position tuy nghiep vu.
- `STAFF`: khong hien menu admin, chi hien self-service neu FE dung chung app.

## 3. Khung UI Admin de xuat

Sidebar nen chia thanh cac nhom:

1. Dashboard
2. Nhan su
   - Nhan vien
   - Phong ban
   - Cham cong
   - Ngay nghi cong ty
3. Phe duyet
   - Don nghi phep
   - Tang ca
   - Bao cao an toan
   - Nguoi phu thuoc thue
   - Muc ho tro nguoi phu thuoc
4. Luong
   - Bang luong
   - Cau hinh phu cap trong ho so nhan vien
5. San xuat
   - Ke hoach san xuat
   - Bao cao hang ngay
   - Loi bao cao
   - Ton kho
6. Noi bo
   - Su kien / thong bao
   - Tin tuc noi bo
   - Notification
   - Chat / nhom
7. Dich vu nhan vien
   - Dat com
   - Mon an / canteen
   - Dong phuc
8. He thong
   - Token FCM
   - Media

## 4. Enum va option dung chung

Product:

```txt
D86_CTC, D59P, C84_BUV, D16E_COP, D637F, D93F_PAO_DC2, D67E_PAO,
D61F_PAO_DC2, D66_DC3, DF93_4, DF93_3, D042F_PAO_DC3, D14KFR,
DK05FR_1, DK05FR_2, C84N, C089, D860F_PAO_DC3, D67E_CTC,
D66_5, D66_6, D66_7, D93F_PAO_DC4, D042F_PAO_DC4, D14KRR,
DK05RR_1, DK05RR_2, D61F_PAO_DC4
```

Shift:

```txt
A, B
```

Work shift:

```txt
DAY, NIGHT
```

Notification type:

```txt
INFO, WARNING, ERROR, SUCCESS, SYSTEM
```

Message type:

```txt
TEXT, IMAGE, VIDEO, DOCUMENT, OTHER
```

Uniform type:

```txt
work_jacket, work_pants, coveralls, reflective_vest, anti_static_clothing,
flame_resistant, work_gloves, safety_shoes, safety_helmet, work_shoes,
work_trousers
```

Uniform size:

```txt
XS, S, M, L, XL, XXL, XXXL, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45
```

Tax dependent:

```txt
status: PENDING, APPROVED, REJECTED
relationship: CHILD, SPOUSE, PARENT, SIBLING, OTHER
gender: MALE, FEMALE, OTHER
```

Overtime hours:

```txt
1..12
```

## 5. API map theo module

Tat ca endpoint ben duoi can them prefix `/api/version/v1`.

### Auth

| Method | Path | Muc dich | Body / params chinh |
|---|---|---|---|
| POST | `/login` | Dang nhap | `user_name`, `password` |

### Users

| Method | Path | Muc dich | Body / params chinh |
|---|---|---|---|
| GET | `/users` | Lay danh sach nhan vien | none |
| GET | `/users/:id` | Chi tiet nhan vien | `id` path |
| POST | `/users` | Tao nhan vien | xem form field ben duoi |
| PUT | `/users` | Cap nhat nhan vien | `id` + field can sua |
| DELETE | `/users/:id` | Xoa mem nhan vien | `id` path |
| POST | `/users/getuserwithdepartmentid` | Lay user theo phong ban | `department_id` |
| POST | `/users/finduserwithfield` | Loc user theo field | `position` |
| POST | `/users/findbyname` | Tim theo ten | body la ten/string tuy router |
| POST | `/users/getalluserforotrequestfeature` | Lay user phuc vu OT | filter theo position/department tuy use case |
| POST | `/users/upload-avatar` | Upload avatar | `multipart/form-data` |

Form tao user:

```json
{
  "name": "Nguyen Van A",
  "user_name": "nva",
  "email": "a@example.com",
  "password": "123456",
  "dob": "1990-01-01",
  "phone": "0900000000",
  "avatar": "",
  "ic_id": "IC001",
  "employee_id": 1001,
  "is_active": true,
  "is_admin": false,
  "is_officer": false,
  "role": "STAFF",
  "position": "HINO",
  "department_id": "uuid",
  "begin_date": "2024-01-01",
  "is_offical_staff": true,
  "salary_hourly": 1200,
  "shift_night_pay": 300,
  "travel_allowance_pay": 5000,
  "paid_days": 12
}
```

Bang admin nen co cot: ma NV, ten, username, email, department, position, role, active, official staff, hourly salary, begin date, action.

### Department

| Method | Path | Muc dich | Body |
|---|---|---|---|
| GET | `/department/getall` | Lay danh sach phong ban | none |
| POST | `/department/getbyid` | Chi tiet phong ban | `id` |
| POST | `/department/create` | Tao phong ban | `name` |

### Checkin

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/checkin/create` | Tao/cap nhat cham cong | `user_id`, `time_in`, `date`, `work_shift`, `is_weekend` hoac payload checkout |
| POST | `/checkin/search` | Cham cong user trong thang | theo use case |
| POST | `/checkin/getcheckinindateofposition` | Danh sach cham cong theo ngay/position | `date`, `position` |
| POST | `/checkin/getcheckindetailindateofuser` | Chi tiet cham cong 1 user trong ngay | `date`, `user_id` |

Model checkin:

```txt
user_id, time_in, time_out, date, work_time, go_out, go_in, over_time,
work_shift, is_weekend, is_checked, is_paid_leave
```

UI nen co calendar/table theo ngay, filter position, badge `checked`, `paid leave`, `weekend`, va drawer chi tiet.

### Day offs

| Method | Path | Muc dich | Body |
|---|---|---|---|
| GET | `/dayoffs/getall` | Tat ca ngay nghi | none |
| POST | `/dayoffs/getbyid` | Chi tiet | `id` |
| POST | `/dayoffs/create` | Tao ngay nghi, admin only | `user_id`, `date`, `user_id` admin de middleware check |
| PUT | `/dayoffs/update` | Sua ngay nghi, admin only | `id`, `date`, `user_id` |
| POST | `/dayoffs/deletebyid` | Xoa ngay nghi, admin only | `id`, `user_id` |

Luu y: middleware `authAdminRole` doc `user_id` trong body va yeu cau user do co role `ADMIN`.

### Paid leave

| Method | Path | Muc dich | Body |
|---|---|---|---|
| GET | `/paidleave` | Tat ca don nghi | none |
| POST | `/paidleave/create` | Tao don nghi | `reason`, `user_id`, `leader_id`, `date_request`, `date_leave`, `is_paid`, `position`, `is_half` |
| POST | `/paidleave/search` | Loc don nghi | `user_id`, `leader_id`, `date_request`, `date_leave`, `position`, `is_confirm`, `is_approve` |
| POST | `/paidleave/update` | Leader/quan ly cap nhat | `id`, `user_id`, `feedback`, `is_confirm`, `admin_id` |
| POST | `/paidleave/updateconfirm` | Xac nhan phe duyet | `id`, cac field update |
| PUT | `/paidleave` | Cap nhat active/approve | `id`, `user_id`, field update; middleware chan `STAFF` |
| POST | `/paidleave/delete` | Xoa don | `id`, `user_id` |

Trang admin nen chia tab: Cho xac nhan, Da xac nhan, Da duyet, Tu choi. Status suy ra tu `is_confirm`, `is_approve`, `is_paid`.

### Overtime request

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/overtimerequest/create` | Tao OT | `user_id`, `department_id`, `leader_id`, `admin_id`, `position`, `date`, `overtime_hours`, `description` |
| POST | `/overtimerequest/getAll` | Tat ca OT, admin only | body phai co `user_id` admin |
| POST | `/overtimerequest/getbyid` | Chi tiet OT | `id` |
| POST | `/overtimerequest/getbyuserid` | OT theo user | `user_id` |
| POST | `/overtimerequest/updateisconfirm` | Leader xac nhan | `id`, `user_id` |
| POST | `/overtimerequest/updateisapproved` | Admin duyet | `id`, `user_id` admin |
| POST | `/overtimerequest/deletebyid` | Xoa OT | `id`, `user_id` |

Status: `is_confirm=false` la cho leader, `is_confirm=true && is_approved=false` la cho admin, `is_approved=true` la da duyet.

### Payroll

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/payroll/create` | Tao bang luong | xem model payroll |
| POST | `/payroll/update` | Cap nhat bang luong | `id` + field can sua |
| POST | `/payroll/search` | Tim luong theo user/thang | `user_id`, `date` |
| POST | `/payroll/searchbyid` | Chi tiet bang luong | `id` |
| POST | `/payroll/destroy` | Xoa mem bang luong | `id` |

Field payroll chinh:

```txt
user_id, date, pay_date, work_time, over_time, paid_vacation_days,
weekend_time, paid_vacation_pay, work_salary, shift_night_salary,
over_time_salary, refund_money, other_pay, weekend_salary,
attendance_allowance_pay, travel_allowance_pay, bonus_pay, gross_salary,
income_tax, social_insurance, health_insurance, uniform_deduction,
accident_insurance, club_fee, rent_home, cost_of_living, other_deduction,
shift_night, net_salary, is_active
```

FE nen hien form theo 3 nhom: thoi gian cong, khoan cong, khoan tru. `gross_salary` va `net_salary` dang required.

### Plan production

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/planproduction/create` | Tao ke hoach | `department_id`, `date`, `quantity`, `product`, `position`, `is_custom`, `operation_time`, `work_shift`, `production_line` |
| PUT | `/planproduction/update` | Sua ke hoach | `id` + field can sua |
| POST | `/planproduction/searchbyid` | Chi tiet | `id` |
| POST | `/planproduction/searchbydateanddepartment` | Loc theo khoang ngay/phong ban | `department_id`, `start_date`, `end_date` |
| POST | `/planproduction/destroy` | Xoa | `id` |

UI nen co lich 7 ngay, filter department/position/line/shift, va che do bulk create theo ngay.

### Daily report va code error

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/dailyreport/create` | Tao report | xem payload ben duoi |
| POST | `/dailyreport` | Tao report legacy | payload report |
| POST | `/dailyreport/getall` | Danh sach report | filter tuy use case |
| POST | `/dailyreport/search` | Search report | `department_id`, `date`, `product`, `shift`, `user_id` |
| GET | `/dailyreport/:id` | Chi tiet report | path `id` |
| POST | `/error-of-report/findByDailyReportId` | Lay loi theo report | `daily_report_id` |

Payload tao daily report:

```json
{
  "product": "D59P",
  "user_id": "uuid",
  "department_id": "uuid",
  "date": "2026-05-22",
  "shift": "A",
  "quantity": 100,
  "good_quantity": 95,
  "defective_quantity": 5,
  "cycle_time": 1.2,
  "operated_time": 7,
  "shutdown_time": 1,
  "operator_history": "note",
  "errors": [
    {
      "code": "01",
      "description": "Machine stopped",
      "shutdown_time": 30,
      "error_date": "2026-05-22"
    }
  ]
}
```

Rule: `errors[].error_date` phai cung ngay voi `date`.

### Inventory

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/inventory/create` | Tao ton kho | `product`, `quantity`, `department_id` |
| POST | `/inventory/search` | Tim ton kho | `product`, `department_id` |
| POST | `/inventory/getall` | Tat ca ton kho | filter tuy router |
| POST | `/inventory/update` | Cap nhat ton kho | `product`, `quantity`, `department_id` |

Luu y update validate khong co `id`, backend co the update theo product/department.

### Events, event check, safety check

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/events/create` | Tao su kien | `name`, `description`, `date_start`, `date_end`, `position`, `media`, `is_safety`, `is_active` |
| POST | `/events/update` | Sua su kien | `id`, `name`, `description`, `is_safety`, `is_active` |
| POST | `/events/delete` | Xoa su kien | `id` |
| POST | `/events/searchbyid` | Chi tiet | `id` |
| GET | `/events/getall` | Tat ca su kien | none |
| POST | `/events/getwithposition` | Su kien theo position | `position` |
| POST | `/eventcheck/create` | User xac nhan tham gia | `user_id`, `event_id`, `is_confirm` |
| POST | `/eventcheck/searcheventchecked` | Kiem tra user da confirm | `user_id`, `event_id` |
| POST | `/safetycheck/create` | Safety check | `user_id`, `event_id`, `is_safety`, `feedback`, `is_at_home`, `is_can_work` |
| POST | `/safetycheck/searchsafetychecked` | Tim safety check | `user_id`, `event_id` |
| POST | `/safetycheck/getallusercheckedsafetycheckevent` | DS user check safety event | `event_id` |

Trang admin su kien nen co switch `is_safety`; neu true thi hien tab safety responses.

### Safety report

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/safetyreport/create` | Tao bao cao | `multipart/form-data`, field ben duoi |
| POST | `/safetyreport/update` | Sua bao cao | `id`, `user_id`, `title`, `content`, `solution`, `corrective_action`, `leader_id` |
| POST | `/safetyreport/confirm` | Leader xac nhan | `id`, `leader_id`, `corrective_action` |
| POST | `/safetyreport/delete` | Xoa | `id` |
| POST | `/safetyreport/getbyuserid` | Lay theo user/ngay | `user_id`, `date` |
| POST | `/safetyreport/getbydepartmentid` | Lay theo phong ban | `department_id` |

Form create:

```txt
user_id, department_id, title, content, solution, corrective_action?,
date, file? -> media_path
```

### Information / tin noi bo

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/information/create` | Tao tin | `user_id`, `title`, `content`, `date`, `position`, `media`, `is_video`, `is_public`, `is_event` |
| POST | `/information/getinforofuser` | Tin cua user | `user_id` |
| POST | `/information/getinforbyid` | Chi tiet tin | `id` |
| POST | `/information/getallinforbyfield` | Loc tin | `position` required, `title`, `content`, `date`, `is_video`, `is_public`, `is_check_safety` |
| POST | `/information/deleteinformationbyid` | Xoa tin va media | `id` |

FE nen co editor noi dung, uploader media, switch public/event/video.

### Notification va FCM

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/notification/create` | Tao notification | `user_id`, `title`, `message`, `type`, `is_readed` |
| PUT | `/notification/update` | Cap nhat read/status | `id` + field |
| POST | `/notification/destroy` | Xoa | `id` |
| POST | `/notification/search` | Search | filter |
| POST | `/notification/searchById` | Lay theo user | `user_id` |
| POST | `/fcmtoken/create` | Luu FCM token | `user_id`, `fcm_token`, `device_type`, `app_version`, `device_id` |

### Order com, food, canteen

| Method | Path | Muc dich | Body |
|---|---|---|---|
| GET | `/order` | Tat ca order | none |
| POST | `/order` | User dat com | `Authorization` + `date`, `dayOrNight`, `user_id`; middleware tu them `position` |
| DELETE | `/order/:id` | Xoa order | path `id` |
| POST | `/order/user` | Lay/cap nhat order cua user | tuy module |
| PUT | `/order/user` | Danh dau picked/confirmed | tuy module |
| POST | `/order/searchorderwithfield` | Loc order | `id`, `user_id`, `date`, `position` |
| GET | `/food` | Tat ca mon an | none |
| GET | `/food/:id` | Chi tiet mon an | path `id` |
| POST | `/food` | Tao mon an | `name`, `description`, `price` |
| GET | `/canteen` | Tat ca canteen | none |
| GET | `/canteen/:id` | Chi tiet canteen | path `id` |
| POST | `/canteen` | Tao canteen | `factory_name`, `description` |

Luu y order co middleware gio dat com va token. FE nen bat loi `success:false` de hien thong bao het gio dat.

### Uniform order

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/uniformorder/create` | Tao don dong phuc | `user_id`, `position`, `date`, `order_status`, `delivery_date`, `notes`, `items[]` |
| POST | `/uniformorder/search` | Search theo position hoac user/status | body co the la `position` hoac `{ user_id, order_status }` |
| POST | `/uniformorder/getuniformorderdetail` | Chi tiet | `id` |
| POST | `/uniformorder/update` | Cap nhat | `id`, `order_status`, `delivery_date`, `uniform_size`, `quantity`, `notes` |
| POST | `/uniformorder/delete` | Xoa | `id` |

Payload create:

```json
{
  "user_id": "uuid",
  "position": "HINO",
  "date": "2026-05-22",
  "order_status": "pending",
  "delivery_date": "2026-06-01",
  "notes": "",
  "items": [
    {
      "uniform_type": "work_jacket",
      "uniform_size": "M",
      "quantity": 1
    }
  ]
}
```

### Tax dependent

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/taxdependent/create` | Tao nguoi phu thuoc | `multipart/form-data` neu co file |
| PUT | `/taxdependent/update` | Sua nguoi phu thuoc | `id`, `user_id`, field can sua, co the upload file |
| POST | `/taxdependent/delete` | Xoa | `id`, `user_id` |
| POST | `/taxdependent/getbyuserid` | Lay theo user | `user_id` |
| PUT | `/taxdependent/update-status` | Admin cap nhat status | `id`, `user_id` admin, `status` |

Field:

```txt
user_id, name, dob, gender, identification_number, phone, address,
relationship, tax_code, media_path, deduction_amount, status, notes
```

### Dependent support amount

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/dependent-support-amount/create` | Tao muc ho tro | `multipart/form-data`, field ben duoi |
| POST | `/dependent-support-amount/update` | Sua muc ho tro | `id`, `user_id`, field can sua |
| POST | `/dependent-support-amount/confirm` | Admin xac nhan | `id`, `user_id` admin |
| POST | `/dependent-support-amount/delete` | Xoa | `id`, `user_id` |
| POST | `/dependent-support-amount/getbyid` | Chi tiet | `id` |
| POST | `/dependent-support-amount/getbytaxdependentidandyear` | Lay theo dependent/year | `tax_dependent_id`, `year` |

Field:

```txt
tax_dependent_id, user_id, year, supported_amount,
is_supporting_current_year, is_confirm, expected_support_years, notes,
media_path
```

### Chat

| Method | Path | Muc dich | Body |
|---|---|---|---|
| POST | `/conversations/create` | Tao conversation 1-1 | `sender_id`, `receiver_id` |
| POST | `/conversations/creategroup` | Tao group | `title`, `sender_id`, `receivers: [{ user_id }]` |
| POST | `/conversations/delete` | Xoa conversation theo user | `conversation_id`, `user_id` |
| POST | `/message/create` | Gui message | `message`, `user_id`, `conversation_id`, `message_type` |
| POST | `/message/search_all_message_of_conversation` | Lay messages | `conversation_id` |
| POST | `/message/unsend` | Thu hoi | `message_id` |
| POST | `/message/delete` | Xoa message phia user | `message_id`, `user_id` |
| POST | `/groupmember/getgroupmemberofuser` | Nhom cua user | `user_id` |
| POST | `/chat` | Chat bot AI | payload message |

### Media

| Method | Path | Muc dich |
|---|---|---|
| GET | `/media/uploads/:filename` | Lay file local upload |

Trong code hien tai upload chinh dung Cloudinary (`media_path` la URL Cloudinary).

## 6. Man hinh chi tiet can xay

### Dashboard

Widget de xuat:

- Tong nhan vien dang active.
- Don nghi phep cho duyet.
- OT cho leader/admin.
- Bao cao an toan chua confirm.
- Ke hoach san xuat hom nay theo department.
- Ton kho theo product.
- Chart daily report: quantity, good, defective, shutdown_time theo ngay/shift.

Backend chua co endpoint aggregate rieng; FE co the tinh tam tu cac endpoint list/search, hoac de xuat BE bo sung `/dashboard/summary`.

### Nhan vien

Can co:

- Table co filter `position`, `department`, `role`, `is_active`.
- Drawer chi tiet gom thong tin ca nhan, cong viec, luong co ban, lich su request.
- Form create/edit gom validate FE tu Joi backend.
- Hanh dong activate/deactivate qua `PUT /users`.

### Cham cong

Can co:

- Date picker + position filter.
- Table theo user: time in/out, work time, overtime, shift, weekend, paid leave.
- Modal sua checkin neu admin duoc phep.

### Don nghi va OT

Can co:

- Tabs theo trang thai.
- Action `Confirm`, `Approve`, `Reject/Feedback`, `Delete`.
- FE phai gui dung `user_id` cua nguoi dang thao tac cho cac route co middleware role.

### Bang luong

Can co:

- Filter user + thang.
- Bang cac khoan cong/khoan tru.
- Tinh preview `gross_salary`, `net_salary` tren FE de giam loi nhap lieu, nhung van gui field required.
- Export CSV/XLSX la nen co o FE, backend chua thay endpoint export.

### San xuat

Can co:

- Ke hoach san xuat theo lich.
- Daily report form co sub-form `errors[]`.
- Inventory table theo department/product.
- Error detail theo daily report.

### Noi bo, su kien, safety

Can co:

- CRUD su kien, flag `is_safety`.
- Trang xem nguoi da confirm event va safety check.
- CRUD information/tin noi bo voi upload media.
- Notification composer gui cho user.

## 7. Quy uoc request FE nen ap dung

### API client

Pseudocode:

```ts
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Request failed');
  return json.data ?? json;
}
```

### FormData upload

Dung cho `information`, `safetyreport`, `taxdependent`, `dependent-support-amount`, avatar neu route dung upload.

```ts
const fd = new FormData();
fd.append('user_id', currentUser.id);
fd.append('title', values.title);
fd.append('content', values.content);
fd.append('date', values.date);
fd.append('file', file);
```

Khong set `Content-Type` thu cong khi gui `FormData`.

### Date

Tat ca date gui dang:

```txt
yyyy-mm-dd
```

Khong gui locale string.

### Admin middleware

Voi route admin co `authAdminRole`, body phai co:

```json
{
  "user_id": "current admin id"
}
```

Neu action can id doi tuong, payload se co ca:

```json
{
  "id": "target id",
  "user_id": "current admin id"
}
```

## 8. Data model tom tat

### User

```txt
id, name, user_name, email, password, dob, phone, avatar, ic_id,
employee_id, is_active, is_admin, role, position, department_id,
is_officer, salary_hourly, shift_night_pay, travel_allowance_pay,
paid_days, begin_date, is_offical_staff
```

### Department

```txt
id, name
```

### PaidLeaveRequest

```txt
id, reason, user_id, leader_id, admin_id, is_confirm, is_approve,
date_request, date_leave, is_paid, is_half, feedback, position
```

### OvertimeRequest

```txt
id, user_id, leader_id, admin_id, department_id, date, description,
overtime_hours, position, is_confirm, is_approved
```

### Payroll

Xem muc Payroll o tren.

### PlanProduction

```txt
id, department_id, date, quantity, product, position, is_custom,
operation_time, work_shift, production_line
```

### DailyReport

```txt
id, product, user_id, department_id, good_quantity, defective_quantity,
cycle_time, date, shift, quantity, operator_history, operated_time,
shutdown_time
```

### SafetyReport

```txt
id, user_id, leader_id, department_id, title, content, solution,
corrective_action, media_path, is_confirm, date
```

### TaxDependent

```txt
id, user_id, name, dob, gender, identification_number, phone, address,
relationship, media_path, tax_code, deduction_amount, status, notes
```

## 9. Checklist hoan thien FE

- Tao `apiClient` xu ly `success:false` ke ca HTTP 200.
- Tao auth store luu token/currentUser/role/position.
- Tao route guard: chi role `ADMIN`, `MANAGER`, `SUPERVISOR`, `LEADER` vao admin; cac action admin chi mo cho `ADMIN`.
- Tao option constants tu enum trong tai lieu nay.
- Chuan hoa date input/output `yyyy-mm-dd`.
- Moi form co validate FE tu payload required o tren.
- Moi table co empty/loading/error state.
- Moi action destructive co confirm modal.
- Cac flow phe duyet co audit UI: nguoi duyet, ngay, feedback.
- Cac upload dung `FormData` va preview media tu URL tra ve.
- Hien toast loi bang `message` tu API.
- Doi chieu Swagger khi backend chay de bo sung field response thuc te.

## 10. De xuat endpoint can bo sung cho BE

De FE admin gon va nhanh hon, nen bo sung cac endpoint sau:

- `GET /dashboard/summary`: tong nhan vien, pending leave, pending OT, pending safety report, today's production.
- `GET /users/options`: danh sach user rut gon `id/name/employee_id/department/position`.
- `GET /departments/options`: danh sach phong ban rut gon.
- `POST /payroll/bulk-create`: tao luong hang loat theo thang.
- `GET /reports/export`: export payroll/daily report/order.
- `GET /audit-logs`: lich su phe duyet va thay doi du lieu quan trong.

