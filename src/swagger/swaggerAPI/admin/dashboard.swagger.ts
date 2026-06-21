/**
 * @swagger
 * tags:
 *   name: Dashboards
 *   description: Dashboard APIs for admin and leader roles
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DashboardCheckinUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         employee_id:
 *           type: integer
 *         department:
 *           type: object
 *           nullable: true
 *           properties:
 *             name:
 *               type: string
 *     DashboardCheckin:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date
 *         user_id:
 *           type: string
 *           format: uuid
 *         time_in:
 *           type: string
 *           nullable: true
 *         work_shift:
 *           type: string
 *         time_out:
 *           type: string
 *           nullable: true
 *         work_time:
 *           type: number
 *           nullable: true
 *         over_time:
 *           type: number
 *           nullable: true
 *         is_weekend:
 *           type: boolean
 *         is_paid_leave:
 *           type: boolean
 *         User:
 *           $ref: '#/components/schemas/DashboardCheckinUser'
 *     DashboardCheckinPage:
 *       type: object
 *       properties:
 *         rows:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DashboardCheckin'
 *         count:
 *           type: integer
 *           example: 8
 *     DashboardPaidLeaveCheckin:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date
 *         user_id:
 *           type: string
 *           format: uuid
 *         time_in:
 *           type: string
 *           nullable: true
 *         work_shift:
 *           type: string
 *         time_out:
 *           type: string
 *           nullable: true
 *         work_time:
 *           type: number
 *           nullable: true
 *         over_time:
 *           type: number
 *           nullable: true
 *         is_weekend:
 *           type: boolean
 *         is_paid_leave:
 *           type: boolean
 *         position:
 *           type: string
 *       additionalProperties: true
 *     DashboardPaidLeaveCheckinPage:
 *       type: object
 *       properties:
 *         rows:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DashboardPaidLeaveCheckin'
 *         count:
 *           type: integer
 *           example: 8
 *     DashboardOrderUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         employee_id:
 *           type: integer
 *         department:
 *           type: object
 *           nullable: true
 *           properties:
 *             name:
 *               type: string
 *     DashboardOrder:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date
 *         dayOrNight:
 *           type: string
 *         user_id:
 *           type: string
 *           format: uuid
 *         isConfirmed:
 *           type: boolean
 *         isPicked:
 *           type: boolean
 *         position:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/DashboardOrderUser'
 *     DashboardOrderPage:
 *       type: object
 *       properties:
 *         rows:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DashboardOrder'
 *         count:
 *           type: integer
 *           example: 8
 *     DashboardUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         phone:
 *           type: string
 *           nullable: true
 *         avatar:
 *           type: string
 *           nullable: true
 *         department:
 *           type: object
 *           nullable: true
 *           properties:
 *             name:
 *               type: string
 *     DashboardUserPage:
 *       type: object
 *       properties:
 *         rows:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DashboardUser'
 *         count:
 *           type: integer
 *           example: 8
 *     DashboardAuditLogActor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         employee_id:
 *           type: integer
 *     DashboardAuditLog:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         actor_id:
 *           type: string
 *           format: uuid
 *         actor_name:
 *           type: string
 *         action:
 *           type: string
 *           enum: [CREATE, UPDATE, DELETE, APPROVE, REJECT, CONFIRM]
 *         resource_type:
 *           type: string
 *         resource_id:
 *           type: string
 *           format: uuid
 *         old_value:
 *           type: object
 *           nullable: true
 *         new_value:
 *           type: object
 *           nullable: true
 *         ip_address:
 *           type: string
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         actorDetail:
 *           $ref: '#/components/schemas/DashboardAuditLogActor'
 *     DashboardAuditLogPage:
 *       type: object
 *       properties:
 *         rows:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DashboardAuditLog'
 *         count:
 *           type: integer
 *           example: 8
 *     AdminCreateUserRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - user_name
 *         - password
 *         - dob
 *         - employee_id
 *         - department_id
 *         - role
 *         - begin_date
 *         - salary_hourly
 *         - shift_night_pay
 *         - travel_allowance_pay
 *         - paid_days
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         user_name:
 *           type: string
 *         password:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         phone:
 *           type: string
 *         avatar:
 *           type: string
 *           nullable: true
 *         ic_id:
 *           type: string
 *         employee_id:
 *           type: integer
 *         department_id:
 *           type: string
 *           format: uuid
 *         role:
 *           type: string
 *           enum: [STAFF, LEADER, SUPERVISOR, MANAGER, ADMIN, SUPER_ADMIN]
 *         begin_date:
 *           type: string
 *           format: date
 *         is_officer:
 *           type: boolean
 *         is_active:
 *           type: boolean
 *         is_admin:
 *           type: boolean
 *         is_offical_staff:
 *           type: boolean
 *         salary_hourly:
 *           type: integer
 *         shift_night_pay:
 *           type: integer
 *         travel_allowance_pay:
 *           type: integer
 *         paid_days:
 *           type: integer
 *       description: Position is injected from the authenticated admin token.
 *     AdminCreatedUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         user_name:
 *           type: string
 *         email:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         phone:
 *           type: string
 *           nullable: true
 *         employee_id:
 *           type: integer
 *         department_id:
 *           type: string
 *           format: uuid
 *         position:
 *           type: string
 *         role:
 *           type: string
 *         is_active:
 *           type: boolean
 *         is_admin:
 *           type: boolean
 *         is_officer:
 *           type: boolean
 *         is_offical_staff:
 *           type: boolean
 *         avatar:
 *           type: string
 *           nullable: true
 *         begin_date:
 *           type: string
 *           format: date
 *         salary_hourly:
 *           type: integer
 *         shift_night_pay:
 *           type: integer
 *         travel_allowance_pay:
 *           type: integer
 *         paid_days:
 *           type: integer
 *       additionalProperties: true
 *     AdminCreateOrderRequest:
 *       type: object
 *       required:
 *         - date
 *         - dayOrNight
 *         - user_id
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *         dayOrNight:
 *           type: string
 *           enum: [DAY, NIGHT]
 *         user_id:
 *           type: string
 *           format: uuid
 *       description: Position is injected from the authenticated admin token.
 *     AdminCreatedOrder:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date
 *         dayOrNight:
 *           type: string
 *         user_id:
 *           type: string
 *           format: uuid
 *         position:
 *           type: string
 *         isConfirmed:
 *           type: boolean
 *         isPicked:
 *           type: boolean
 *       additionalProperties: true
 *     DashboardSummaryData:
 *       type: object
 *       properties:
 *         pending_paid_leave:
 *           $ref: '#/components/schemas/PaidLeaveRequestPage'
 *         pending_checkins:
 *           $ref: '#/components/schemas/DashboardCheckinPage'
 *         pending_orders:
 *           $ref: '#/components/schemas/DashboardOrderPage'
 *         users_by_position:
 *           $ref: '#/components/schemas/DashboardUserPage'
 *         paid_leaves:
 *           $ref: '#/components/schemas/DashboardPaidLeaveCheckinPage'
 *         uniforms_pending:
 *           $ref: '#/components/schemas/UniformOrderPage'
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/summarys:
 *   post:
 *     summary: Get admin dashboard summary
 *     tags: [Dashboards]
 *     description: Returns summary data for the admin's position from the token. Check-ins are loaded for the previous day, while paid leaves, orders, users, and uniforms are scoped by the authenticated admin position.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-04"
 *     responses:
 *       202:
 *         description: Admin dashboard summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DashboardSummaryData'
 *       203:
 *         description: Request processed but summary data was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Missing date in body or position from token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: User does not have permission
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/get-checkins:
 *   post:
 *     summary: Get checkins by admin position and date
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-04"
 *     responses:
 *       202:
 *         description: Checkins retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DashboardCheckinPage'
 *       200:
 *         description: Request processed but checkins were not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Missing date in body or position from token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: User does not have permission
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/get-orders:
 *   post:
 *     summary: Get orders by admin position and date
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-04"
 *     responses:
 *       202:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DashboardOrderPage'
 *       200:
 *         description: Request processed but orders were not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Missing date in body or position from token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: User does not have permission
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/get-users:
 *   post:
 *     summary: Get users by admin position
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DashboardUserPage'
 *       200:
 *         description: Request processed but users were not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Missing position from token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: User does not have permission
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/create-user:
 *   post:
 *     summary: Create a user as admin
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     description: Position is taken from the authenticated admin token. Admin users cannot create another ADMIN account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminCreateUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AdminCreatedUser'
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Admin users cannot create another ADMIN account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/create-order:
 *   post:
 *     summary: Create an order as admin
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     description: Position is taken from the authenticated admin token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminCreateOrderRequest'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AdminCreatedOrder'
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/confirm/paid-leave-confirm:
 *   post:
 *     summary: Confirm an approved paid leave request as admin
 *     tags: [Dashboards]
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
 *               - user_id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               feedback:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       202:
 *         description: Paid leave request confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaidLeaveSuccess'
 *       200:
 *         description: Request processed but confirm failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Missing required fields or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: User does not have permission
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/version/v1/dashboards/leader/approve-paid-leave-request:
 *   post:
 *     summary: Approve or reject a paid leave request as leader
 *     tags: [Dashboards]
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
 *               - is_approve
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               is_approve:
 *                 type: boolean
 *                 example: true
 *               feedback:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       202:
 *         description: Paid leave approval updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaidLeaveSuccess'
 *       200:
 *         description: Request processed but approval update failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Missing required fields or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: User does not have permission
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/version/v1/dashboards/leader/get-paid-leave-request:
 *   get:
 *     summary: Get pending paid leave requests for leader
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Pending paid leave requests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PaidLeaveRequestPage'
 *       200:
 *         description: Request processed but no paid leave request was found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Missing leader id from token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: User does not have permission
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * tags:
 *   name: Audit Logs
 *   description: Searchable audit log APIs
 */

/**
 * @swagger
 * /api/version/v1/dashboards/logs/search:
 *   post:
 *     summary: Search audit logs
 *     tags: [Audit Logs]
 *     security:
 *       - bearerAuth: []
 *     description: Available to ADMIN and MANAGER roles. Supports filtering by resource type, actor, and date range.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resource_type:
 *                 type: string
 *               actor_id:
 *                 type: string
 *                 format: uuid
 *               from:
 *                 type: string
 *                 format: date
 *               to:
 *                 type: string
 *                 format: date
 *               page:
 *                 type: integer
 *                 example: 1
 *               limit:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       200:
 *         description: Audit logs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DashboardAuditLogPage'
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: User does not have permission
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
