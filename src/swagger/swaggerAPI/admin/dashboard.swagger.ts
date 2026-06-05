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
 *         user_name:
 *           type: string
 *         role:
 *           type: string
 *         email:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         phone:
 *           type: string
 *         employee_id:
 *           type: integer
 *         is_active:
 *           type: boolean
 *         position:
 *           type: string
 *         is_admin:
 *           type: boolean
 *         is_officer:
 *           type: boolean
 *         avatar:
 *           type: string
 *           nullable: true
 *         department:
 *           type: object
 *           nullable: true
 *           properties:
 *             name:
 *               type: string
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
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DashboardUser'
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/summarys/summarys:
 *   get:
 *     summary: Get admin dashboard summary
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DashboardUser'
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
 * /api/version/v1/dashboards/leader/aprove-paid-leave-request:
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
