/**
 * @swagger
 * tags:
 *   name: DependentSupportAmount
 *   description: API quản lý số tiền hỗ trợ người phụ thuộc theo năm
 */

/**
 * @swagger
 * /dependent-support-amount/create:
 *   post:
 *     summary: Tạo bản ghi số tiền hỗ trợ người phụ thuộc
 *     tags: [DependentSupportAmount]
 *     description: Tạo bản ghi mới. Có thể gửi multipart/form-data để đính kèm file chứng từ (media). Các field khác gửi dạng form field hoặc JSON.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - tax_dependent_id
 *               - user_id
 *               - year
 *             properties:
 *               tax_dependent_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID người phụ thuộc (tax dependent)
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID user (nhân viên) sở hữu bản ghi
 *                 example: "123e4567-e89b-12d3-a456-426614174001"
 *               year:
 *                 type: integer
 *                 minimum: 2000
 *                 maximum: 2200
 *                 description: Năm hỗ trợ
 *                 example: 2024
 *               supported_amount:
 *                 type: number
 *                 minimum: 0
 *                 description: Số tiền đã hỗ trợ (tùy chọn)
 *                 example: 5000000
 *               is_supporting_current_year:
 *                 type: boolean
 *                 description: Đang hỗ trợ trong năm hiện tại (tùy chọn, mặc định false)
 *                 example: true
 *               is_confirm:
 *                 type: boolean
 *                 description: Đã xác nhận hay chưa (tùy chọn, mặc định false)
 *                 example: false
 *               expected_support_years:
 *                 type: integer
 *                 minimum: 0
 *                 description: Số năm dự kiến hỗ trợ (tùy chọn)
 *                 example: 4
 *               notes:
 *                 type: string
 *                 description: Ghi chú (tùy chọn)
 *                 example: "Hỗ trợ học phí"
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: File chứng từ đính kèm (tùy chọn). Middleware upload sẽ gán URL vào media_path trong body.
 *     responses:
 *       201:
 *         description: Tạo bản ghi thành công. Trả về data bản ghi vừa tạo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [success]
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Bản ghi dependent support amount vừa tạo (id, tax_dependent_id, user_id, year, supported_amount, is_supporting_current_year, is_confirm, expected_support_years, notes, media_path, created_at, updated_at)
 *       200:
 *         description: Xử lý không thành công (business logic, ví dụ trùng năm, validate repo...)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       400:
 *         description: Thiếu field bắt buộc (tax_dependent_id, user_id, year)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input: Missing required tax_dependent_id, user_id, year"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /dependent-support-amount/update:
 *   post:
 *     summary: Cập nhật bản ghi số tiền hỗ trợ người phụ thuộc
 *     tags: [DependentSupportAmount]
 *     description: Cập nhật bản ghi đã có. Chỉ bản ghi chưa xác nhận mới cập nhật được. Có thể gửi multipart/form-data để đính kèm/cập nhật file chứng từ.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - user_id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: ID bản ghi cần cập nhật
 *                 example: "123e4567-e89b-12d3-a456-426614174002"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID user sở hữu bản ghi (để kiểm quyền)
 *                 example: "123e4567-e89b-12d3-a456-426614174001"
 *               supported_amount:
 *                 type: number
 *                 minimum: 0
 *                 description: Số tiền đã hỗ trợ (tùy chọn)
 *                 example: 6000000
 *               is_supporting_current_year:
 *                 type: boolean
 *                 description: Đang hỗ trợ trong năm hiện tại (tùy chọn)
 *                 example: false
 *               expected_support_years:
 *                 type: integer
 *                 minimum: 0
 *                 description: Số năm dự kiến hỗ trợ (tùy chọn)
 *                 example: 3
 *               notes:
 *                 type: string
 *                 description: Ghi chú (tùy chọn)
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: File chứng từ mới (tùy chọn), upload để thay file cũ
 *     responses:
 *       202:
 *         description: Cập nhật thành công. Response chỉ có success, không trả data/message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: Xử lý không thành công (ví dụ bản ghi đã confirm, không tìm thấy...)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       400:
 *         description: Thiếu id hoặc user_id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input: Missing required id, user_id"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /dependent-support-amount/confirm:
 *   post:
 *     summary: Xác nhận bản ghi số tiền hỗ trợ (chỉ Admin)
 *     tags: [DependentSupportAmount]
 *     description: Xác nhận một bản ghi. Yêu cầu quyền admin (authAdminRole).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: ID bản ghi cần xác nhận
 *                 example: "123e4567-e89b-12d3-a456-426614174002"
 *     responses:
 *       202:
 *         description: Xác nhận thành công. Response chỉ có success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: Xử lý không thành công (business logic)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       400:
 *         description: Thiếu id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input: Missing required id"
 *       401:
 *         description: Chưa xác thực hoặc không có quyền admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /dependent-support-amount/delete:
 *   post:
 *     summary: Xóa bản ghi số tiền hỗ trợ người phụ thuộc
 *     tags: [DependentSupportAmount]
 *     description: Xóa bản ghi. Chỉ user sở hữu (user_id khớp) mới xóa được.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - user_id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: ID bản ghi cần xóa
 *                 example: "123e4567-e89b-12d3-a456-426614174002"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID user sở hữu bản ghi (để kiểm quyền)
 *                 example: "123e4567-e89b-12d3-a456-426614174001"
 *     responses:
 *       202:
 *         description: Xóa thành công. Response chỉ có success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: Xử lý không thành công (ví dụ không tìm thấy, không đủ quyền...)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       400:
 *         description: Thiếu id hoặc user_id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input: Missing required id, user_id"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /dependent-support-amount/getbyid:
 *   post:
 *     summary: Lấy bản ghi số tiền hỗ trợ theo ID
 *     tags: [DependentSupportAmount]
 *     description: Lấy chi tiết một bản ghi theo id. Body JSON với field id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: ID bản ghi cần lấy
 *                 example: "123e4567-e89b-12d3-a456-426614174002"
 *     responses:
 *       202:
 *         description: Lấy bản ghi thành công. Trả về success và data (object bản ghi).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [success]
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Bản ghi dependent support amount (id, tax_dependent_id, user_id, year, supported_amount, is_supporting_current_year, is_confirm, expected_support_years, notes, media_path, created_at, updated_at)
 *       200:
 *         description: Không tìm thấy hoặc xử lý không thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       400:
 *         description: Thiếu id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input: Missing required id"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /dependent-support-amount/getbytaxdependentidandyear:
 *   post:
 *     summary: Get dependent support amount by tax dependent ID and year
 *     tags: [DependentSupportAmount]
 *     description: Retrieve dependent support amount record(s) by tax_dependent_id and year. Request body application/json with required tax_dependent_id and year.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tax_dependent_id
 *               - year
 *             properties:
 *               tax_dependent_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the tax dependent
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               year:
 *                 type: integer
 *                 minimum: 2000
 *                 maximum: 2200
 *                 description: Year of support
 *                 example: 2024
 *     responses:
 *       202:
 *         description: Records retrieved successfully. Returns success true and data (array of records).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       tax_dependent_id:
 *                         type: string
 *                         format: uuid
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                       year:
 *                         type: integer
 *                       supported_amount:
 *                         type: number
 *                       is_supporting_current_year:
 *                         type: boolean
 *                       is_confirm:
 *                         type: boolean
 *                       expected_support_years:
 *                         type: number
 *                       notes:
 *                         type: string
 *                       media_path:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *       200:
 *         description: Request processed but not successful (e.g. not found)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to get dependent support amount"
 *       400:
 *         description: Bad request (missing required tax_dependent_id or year)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input: Missing required tax_dependent_id, year"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
