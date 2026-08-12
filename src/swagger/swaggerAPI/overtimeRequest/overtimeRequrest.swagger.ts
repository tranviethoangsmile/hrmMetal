/**
 * @swagger
 * tags:
 *   name: OvertimeRequest
 *   description: API for managing overtime requests
 */
/**
 * @swagger
 * /api/version/v1/dashboards/leader/overtime-requests/create:
 *   post:
 *     summary: Create a new overtime request
 *     tags:
 *       - OvertimeRequest
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - date
 *               - position
 *               - overtime_hours
 *               - description
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user requesting overtime.
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the overtime request.
 *                 example: "2023-10-01"
 *               position:
 *                 type: string
 *                 description: Position of the user.
 *                 example: "MANAGER"
 *               overtime_hours:
 *                 type: number
 *                 description: Number of overtime hours requested.
 *                 example: 4
 *               description:
 *                 type: string
 *                 description: Description or reason for the overtime request.
 *                 example: "Working on project deadline."
 *     responses:
 *       201:
 *         description: Overtime request created successfully.
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
 *                       description: ID of the created overtime request.
 *                       example: "req-001"
 *                     user_id:
 *                       type: string
 *                       description: ID of the user requesting overtime.
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Date of the overtime request.
 *                       example: "2023-10-01"
 *                     position:
 *                       type: string
 *                       description: Position of the user.
 *                       example: "MANAGER"
 *                     department_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the department.
 *                       example: "dept-001"
 *                     overtime_hours:
 *                       type: number
 *                       description: Number of overtime hours requested.
 *                       example: 4
 *                     description:
 *                       type: string
 *                       description: Description or reason for the overtime request.
 *                       example: "Working on project deadline."
 *                     leader_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the leader approving the request.
 *                       example: "leader-123"
 *                     is_confirm:
 *                       type: boolean
 *                       description: Whether the request has been confirmed by leader.
 *                       example: false
 *                     is_approved:
 *                       type: boolean
 *                       description: Whether the request has been approved by admin.
 *                       example: false
 *       200:
 *         description: Request processed but failed to create overtime request.
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
 *                   example: "Failed to create overtime request."
 *       400:
 *         description: Missing or invalid input data.
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
 *                   example: "Missing values: user_id, date"
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error."
 */
/**
 * @swagger
 * /api/version/v1/dashboards/leader/overtime-requests/destroy:
 *   post:
 *     summary: Delete an overtime request
 *     tags:
 *       - OvertimeRequest
 *     description: Delete an overtime request by its ID
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
 *                 description: ID of the overtime request to delete
 *                 example: "req-001"
 *     responses:
 *       200:
 *         description: Overtime request deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing required fields
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
 *                   example: "\"id\" is required"
 *       500:
 *         description: Internal server error
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
 * /api/version/v1/overtimerequest/getAll:
 *   post:
 *     summary: Retrieve all overtime requests
 *     tags:
 *       - OvertimeRequest
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Successfully retrieved all overtime requests.
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
 *                         description: ID of the overtime request.
 *                         example: "req-001"
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         description: ID of the user who made the request.
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date of the overtime request.
 *                         example: "2023-10-01"
 *                       position:
 *                         type: string
 *                         description: Position of the user.
 *                         example: "MANAGER"
 *                       department_id:
 *                         type: string
 *                         format: uuid
 *                         description: ID of the department.
 *                         example: "dept-001"
 *                       overtime_hours:
 *                         type: number
 *                         description: Number of overtime hours requested.
 *                         example: 4
 *                       description:
 *                         type: string
 *                         description: Description or reason for the overtime request.
 *                         example: "Working on project deadline."
 *                       leader_id:
 *                         type: string
 *                         format: uuid
 *                         description: ID of the leader approving the request.
 *                         example: "leader-123"
 *                       is_confirm:
 *                         type: boolean
 *                         description: Whether the request has been confirmed by leader.
 *                         example: false
 *                       is_approved:
 *                         type: boolean
 *                         description: Whether the request has been approved by admin.
 *                         example: false
 *                       userDetail:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: ID of the user.
 *                             example: "123e4567-e89b-12d3-a456-426614174000"
 *                           name:
 *                             type: string
 *                             description: Name of the user.
 *                             example: "John Doe"
 *                           avatar:
 *                             type: string
 *                             nullable: true
 *                             description: Avatar URL of the user.
 *                       leaderDetail:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           name:
 *                             type: string
 *                       departmentDetail:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Engineering"
 *       200:
 *         description: Request processed but failed to retrieve overtime requests.
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
 *                   example: "Failed to retrieve overtime requests."
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error."
 */
/**
 * @swagger
 * /api/version/v1/overtimerequest/getbyid:
 *   post:
 *     summary: Retrieve an overtime request by ID
 *     tags:
 *       - OvertimeRequest
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
 *                 description: ID of the overtime request to retrieve.
 *                 example: "req-001"
 *     responses:
 *       202:
 *         description: Successfully retrieved the overtime request.
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
 *                       description: ID of the overtime request.
 *                       example: "req-001"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the user who made the request.
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Date of the overtime request.
 *                       example: "2023-10-01"
 *                     position:
 *                       type: string
 *                       description: Position of the user.
 *                       example: "MANAGER"
 *                     department_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the department.
 *                       example: "dept-001"
 *                     overtime_hours:
 *                       type: number
 *                       description: Number of overtime hours requested.
 *                       example: 4
 *                     description:
 *                       type: string
 *                       description: Description or reason for the overtime request.
 *                       example: "Working on project deadline."
 *                     leader_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the leader approving the request.
 *                       example: "leader-123"
 *                     is_confirm:
 *                       type: boolean
 *                       description: Whether the request has been confirmed by leader.
 *                       example: false
 *                     is_approved:
 *                       type: boolean
 *                       description: Whether the request has been approved by admin.
 *                       example: false
 *                     userDetail:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           description: ID of the user.
 *                           example: "123e4567-e89b-12d3-a456-426614174000"
 *                         name:
 *                           type: string
 *                           description: Name of the user.
 *                           example: "John Doe"
 *                         avatar:
 *                           type: string
 *                           nullable: true
 *                           description: Avatar URL of the user.
 *                     leaderDetail:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                         name:
 *                           type: string
 *                     departmentDetail:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Engineering"
 *       200:
 *         description: Request processed but failed to retrieve the overtime request.
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
 *                   example: "Overtime request not found."
 *       400:
 *         description: Missing or invalid input data.
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
 *                   example: "ID is required."
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error."
 */
/**
 * @swagger
 * /api/version/v1/dashboards/admin/overtime-requests/update-approve-overtime-request:
 *   post:
 *     summary: Approve an overtime request by admin
 *     tags:
 *       - OvertimeRequest
 *     description: Admin approves a confirmed overtime request
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
 *                 description: ID of the overtime request
 *                 example: "req-001"
 *     responses:
 *       200:
 *         description: Overtime request approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing required fields
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
 *                   example: "\"value\" must be a valid GUID"
 *       500:
 *         description: Internal server error
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
 *                   example: "Server error"
 */
/**
 * @swagger
 * /api/version/v1/overtimerequest/updateisconfirm:
 *   post:
 *     summary: Confirm an overtime request by leader
 *     tags:
 *       - OvertimeRequest
 *     description: Leader confirms an overtime request
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
 *                 description: ID of the overtime request
 *                 example: "req-001"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the leader confirming the request
 *                 example: "leader-123"
 *     responses:
 *       202:
 *         description: Overtime request confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: Request processed but failed to confirm
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
 *                   example: "Failed to confirm overtime request"
 *       400:
 *         description: Missing required fields
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
 *                   example: "Missing values: user_id, id"
 *       500:
 *         description: Internal server error
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
 *                   example: "Server error"
 */
/**
 * @swagger
 * /api/version/v1/overtimerequest/getbyuserid:
 *   post:
 *     tags:
 *       - OvertimeRequest
 *     summary: Get overtime requests by user ID
 *     description: Retrieve all overtime requests for a specific user that are not confirmed
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
 *                 description: The ID of the user
 *                 format: uuid
 *           example:
 *             id: "64f8709a2d7c06dcb3b2f2c5"
 *     responses:
 *       202:
 *         description: Successfully retrieved overtime requests
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
 *                         description: ID of the overtime request
 *                       description:
 *                         type: string
 *                         description: Reason for overtime work
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Creation timestamp
 *                       date:
 *                         type: string
 *                         description: Date of overtime work
 *                       is_confirm:
 *                         type: boolean
 *                         description: Whether the request is confirmed by leader
 *                       leaderDetail:
 *                         type: object
 *                         description: Leader information
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: Leader's ID
 *                           name:
 *                             type: string
 *                             description: Leader's name
 *                           avatar:
 *                             type: string
 *                             description: Leader's avatar URL
 *                       departmentDetail:
 *                         type: object
 *                         description: Department information
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: Department name
 *       200:
 *         description: Request failed
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
 *                   example: "No overtime requests found"
 *       400:
 *         description: Bad request - ID is required
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
 *                   example: "id is required"
 *       500:
 *         description: Internal server error
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
 *                   example: "router error :: ${error?.message}"
 */
