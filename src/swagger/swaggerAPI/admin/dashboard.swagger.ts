/**
 * @swagger
 * tags:
 *   name: Dashboards
 *   description: Dashboard APIs for admin-only routes
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
 *     AdminCreateEventsRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - date_start
 *         - date_end
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         date_start:
 *           type: string
 *           format: date
 *         date_end:
 *           type: string
 *           format: date
 *         media_path:
 *           type: string
 *           nullable: true
 *         is_safety:
 *           type: boolean
 *         is_active:
 *           type: boolean
 *       description: Position is injected from the authenticated admin token.
 *     AdminCreatedEvent:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         date_start:
 *           type: string
 *           format: date
 *         date_end:
 *           type: string
 *           format: date
 *         position:
 *           type: string
 *         media:
 *           type: string
 *           nullable: true
 *         is_safety:
 *           type: boolean
 *         is_active:
 *           type: boolean
 *       additionalProperties: true
 *     AdminCreateInformationRequest:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - date
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         media_path:
 *           type: string
 *           nullable: true
 *         is_video:
 *           type: boolean
 *         is_public:
 *           type: boolean
 *         is_event:
 *           type: boolean
 *       description: user_id and position are injected from the authenticated admin token.
 *     AdminCreatedInformation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         position:
 *           type: string
 *         media:
 *           type: string
 *           nullable: true
 *         is_video:
 *           type: boolean
 *         is_public:
 *           type: boolean
 *         is_event:
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
 * /api/version/v1/dashboards/admin/summarys/s:
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
 * /api/version/v1/dashboards/admin/notifications/create-notification:
 *   post:
 *     summary: Create a notification as admin
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
 *               - user_id
 *               - type
 *               - title
 *               - message
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "user_id_123"
 *               type:
 *                 type: string
 *                 example: "EVENT"
 *               title:
 *                 type: string
 *                 example: "New event"
 *               message:
 *                 type: string
 *                 example: "You have been invited to a new event"
 *     responses:
 *       201:
 *         description: Notification created successfully
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
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                     type:
 *                       type: string
 *                     title:
 *                       type: string
 *                     message:
 *                       type: string
 *                     is_readed:
 *                       type: boolean
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/tax-dependents/update-status-tax-dependent:
 *   put:
 *     summary: Update tax dependent status as admin
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
 *               - status
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
 *                 example: "APPROVED"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tax dependent status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/dashboards/leader/inventorys/update-inventory:
 *   post:
 *     summary: Update inventory as leader
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     description: department_id is injected from the authenticated leader token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - product
 *               - quantity
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               product:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Inventory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/dashboards/leader/paidleaves/get-paid-leave-request:
 *   get:
 *     summary: Get paid leave requests for the current leader
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     description: Returns paid leave requests for the authenticated leader. `leader_id` is taken from the access token.
 *     responses:
 *       202:
 *         description: Paid leave requests retrieved successfully
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
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/dashboards/leader/paidleaves/approve-paid-leave-request:
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
 *               feedback:
 *                 type: string
 *                 nullable: true
 *     description: `leader_id` and `actor_name` are injected from the authenticated user and do not need to be sent in the request body.
 *     responses:
 *       202:
 *         description: Paid leave request updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaidLeaveSuccess'
 *       200:
 *         description: Request processed but not successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Bad request
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
 * /api/version/v1/dashboards/logs/search:
 *   post:
 *     summary: Search audit logs
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
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
 *                 minimum: 1
 *               limit:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *     responses:
 *       200:
 *         description: Logs retrieved successfully
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
 *         description: Bad request
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
 * /api/version/v1/dashboards/admin/checkins/get-checkins:
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
 * /api/version/v1/dashboards/admin/orders/get-orders:
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
 * /api/version/v1/dashboards/admin/users/get-users:
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
 * /api/version/v1/dashboards/admin/users/create-user:
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
 * /api/version/v1/dashboards/admin/orders/create-orders:
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
 * /api/version/v1/dashboards/admin/events/create-event:
 *   post:
 *     summary: Create an event as admin
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     description: Position is injected from the authenticated admin token. media_path is optional and will be mapped to the stored media field.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminCreateEventsRequest'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AdminCreatedEvent'
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
 * /api/version/v1/dashboards/admin/informations/create-information:
 *   post:
 *     summary: Create an information post as admin
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     description: user_id and position are injected from the authenticated admin token. media_path is optional and will be mapped to the stored media field.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminCreateInformationRequest'
 *     responses:
 *       201:
 *         description: Information created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AdminCreatedInformation'
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
 * /api/version/v1/dashboards/admin/informations/get-informations:
 *   get:
 *     summary: Get information posts for the authenticated admin
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve information posts that belong to the authenticated admin user. The admin id is taken from the JWT payload.
 *     responses:
 *       200:
 *         description: Information retrieved successfully
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
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       media:
 *                         type: string
 *                         nullable: true
 *                       position:
 *                         type: string
 *                       is_public:
 *                         type: boolean
 *                       is_video:
 *                         type: boolean
 *                       is_event:
 *                         type: boolean
 *                       User:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           name:
 *                             type: string
 *                           role:
 *                             type: string
 *                           avatar:
 *                             type: string
 *                           department:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *       400:
 *         description: Bad request
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
 *       401:
 *         description: Authentication token is required or invalid
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
 *       403:
 *         description: You do not have permission for this action
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
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/informations/delete-informations:
 *   post:
 *     summary: Delete an information post as admin
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     description: Delete an information post by id. Requires an admin JWT.
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
 *                 example: "b3b7c7e2-8c2e-4e2a-9c2e-4e2a9c2e4e2a"
 *     responses:
 *       200:
 *         description: Information deleted successfully
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
 *                     message:
 *                       type: string
 *                       example: Information deleted successfully
 *       400:
 *         description: Bad request or validation error
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
 *       401:
 *         description: Authentication token is required or invalid
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
 *       403:
 *         description: You do not have permission for this action
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
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/paidleaves/paid-leave-confirm:
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
 * /api/version/v1/dashboards/admin/departments/create-department:
 *   post:
 *     summary: Create a department as admin
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
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Production
 *     responses:
 *       201:
 *         description: Department created successfully
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
 *                     name:
 *                       type: string
 *       400:
 *         description: Bad request or validation error
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
 *       401:
 *         description: Authentication token is required or invalid
 *       403:
 *         description: You do not have permission for this action
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/events/delete-event:
 *   post:
 *     summary: Delete an event as admin
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
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 example: "b3b7c7e2-8c2e-4e2a-9c2e-4e2a9c2e4e2a"
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request or validation error
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
 *       401:
 *         description: Authentication token is required or invalid
 *       403:
 *         description: You do not have permission for this action
 *       500:
 *         description: Server error
 */
