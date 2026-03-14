/**
 * @swagger
 * tags:
 *   name: DependentSupportAmount
 *   description: API quản lý số tiền nuôi người phụ thuộc (số tiền hỗ trợ nuôi người phụ thuộc theo năm)
 */

/**
 * @swagger
 * /dependent-support-amount/create:
 *   post:
 *     summary: Tạo mới số tiền nuôi người phụ thuộc
 *     tags: [DependentSupportAmount]
 *     description: Tạo bản ghi số tiền hỗ trợ nuôi người phụ thuộc theo năm, liên kết với tax_dependent_id và user_id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
 *                 example: "123e4567-e89b-12d3-a456-426614174001"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID người dùng (nhân viên) sở hữu bản ghi
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               year:
 *                 type: integer
 *                 description: Năm áp dụng
 *                 example: 2024
 *               supported_amount:
 *                 type: number
 *                 format: decimal
 *                 description: Số tiền hỗ trợ nuôi (VNĐ)
 *                 example: 4400000
 *               is_supporting_current_year:
 *                 type: boolean
 *                 description: Đang nuôi trong năm hiện tại hay không
 *                 example: true
 *               is_confirm:
 *                 type: boolean
 *                 description: Đã xác nhận (bởi admin) hay chưa
 *                 example: false
 *               expected_support_years:
 *                 type: number
 *                 format: decimal
 *                 description: Số năm dự kiến nuôi
 *                 example: 5
 *               notes:
 *                 type: string
 *                 description: Ghi chú
 *                 example: "Nuôi con đang đi học"
 *     responses:
 *       201:
 *         description: Tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174002"
 *                     tax_dependent_id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174001"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     year:
 *                       type: integer
 *                       example: 2024
 *                     supported_amount:
 *                       type: number
 *                       example: 4400000
 *                     is_supporting_current_year:
 *                       type: boolean
 *                       example: true
 *                     is_confirm:
 *                       type: boolean
 *                       example: false
 *                     expected_support_years:
 *                       type: number
 *                       example: 5
 *                     notes:
 *                       type: string
 *                       example: "Nuôi con đang đi học"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       200:
 *         description: Request xử lý nhưng không thành công (business logic)
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
 *                   example: "Failed to create dependent support amount"
 *       400:
 *         description: Bad request (thiếu hoặc sai trường bắt buộc)
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
 *                   example: "Invalid input: Missing required tax_dependent_id, year, user_id"
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
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /dependent-support-amount/getbyid:
 *   post:
 *     summary: Lấy chi tiết số tiền nuôi người phụ thuộc theo ID
 *     tags: [DependentSupportAmount]
 *     description: Lấy bản ghi dependent support amount theo id.
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
 *                 description: ID bản ghi dependent support amount
 *                 example: "123e4567-e89b-12d3-a456-426614174002"
 *     responses:
 *       202:
 *         description: Lấy dữ liệu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     tax_dependent_id:
 *                       type: string
 *                       format: uuid
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                     year:
 *                       type: integer
 *                     supported_amount:
 *                       type: number
 *                     is_supporting_current_year:
 *                       type: boolean
 *                     is_confirm:
 *                       type: boolean
 *                     expected_support_years:
 *                       type: number
 *                     notes:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       200:
 *         description: Request xử lý nhưng không thành công
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
 *         description: Bad request (thiếu id)
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
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /dependent-support-amount/update:
 *   post:
 *     summary: Cập nhật số tiền nuôi người phụ thuộc
 *     tags: [DependentSupportAmount]
 *     description: Cập nhật bản ghi số tiền hỗ trợ nuôi người phụ thuộc. Chỉ chủ sở hữu (user_id) mới được cập nhật.
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
 *                 description: ID bản ghi cần cập nhật
 *                 example: "123e4567-e89b-12d3-a456-426614174002"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID người dùng (để xác thực quyền sở hữu)
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               supported_amount:
 *                 type: number
 *                 format: decimal
 *                 description: Số tiền hỗ trợ nuôi (VNĐ)
 *                 example: 4400000
 *               is_supporting_current_year:
 *                 type: boolean
 *                 description: Đang nuôi trong năm hiện tại
 *                 example: true
 *               expected_support_years:
 *                 type: number
 *                 format: decimal
 *                 description: Số năm dự kiến nuôi
 *                 example: 5
 *               notes:
 *                 type: string
 *                 description: Ghi chú
 *                 example: "Cập nhật số tiền"
 *     responses:
 *       202:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Updated successfully"
 *       200:
 *         description: Request xử lý nhưng không thành công
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
 *         description: Bad request (thiếu id hoặc user_id)
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
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /dependent-support-amount/confirm:
 *   post:
 *     summary: Xác nhận số tiền nuôi người phụ thuộc (Admin only)
 *     tags: [DependentSupportAmount]
 *     description: Admin xác nhận bản ghi số tiền nuôi người phụ thuộc (cập nhật is_confirm). Yêu cầu quyền admin.
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
 *                 description: ID bản ghi dependent support amount cần xác nhận
 *                 example: "123e4567-e89b-12d3-a456-426614174002"
 *     responses:
 *       202:
 *         description: Xác nhận thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Confirmed successfully"
 *       200:
 *         description: Request xử lý nhưng không thành công
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
 *         description: Bad request (thiếu id)
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
 *         description: Unauthorized (yêu cầu quyền admin)
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
 *                   example: "Unauthorized: Admin role required"
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
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /dependent-support-amount/delete:
 *   post:
 *     summary: Xóa số tiền nuôi người phụ thuộc
 *     tags: [DependentSupportAmount]
 *     description: Xóa bản ghi dependent support amount theo id. Chỉ chủ sở hữu (user_id) mới được xóa.
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
 *                 description: ID người dùng (để xác thực quyền sở hữu)
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       202:
 *         description: Xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Deleted successfully"
 *       200:
 *         description: Request xử lý nhưng không thành công
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
 *         description: Bad request (thiếu id hoặc user_id)
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
 *                   example: "Internal server error"
 */
