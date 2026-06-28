/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Authentication APIs for mobile app and dashboard
 */

/**
 * @swagger
 * /api/version/v1/login/app:
 *   post:
 *     summary: Login for mobile app
 *     tags: [Login]
 *     description: Authenticate a mobile user and return user information plus a JWT token. Allowed roles are STAFF, LEADER, SUPERVISOR, and MANAGER.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - password
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
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
 *                     user_name:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                     position:
 *                       type: string
 *                     dob:
 *                       type: string
 *                       format: date
 *                     role:
 *                       type: string
 *                       example: "STAFF"
 *                     is_admin:
 *                       type: boolean
 *                     department:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         name:
 *                           type: string
 *                     is_officer:
 *                       type: boolean
 *                     department_id:
 *                       type: string
 *                       format: uuid
 *                     is_offical_staff:
 *                       type: boolean
 *                     salary_hourly:
 *                       type: number
 *                     shift_night_pay:
 *                       type: number
 *                     travel_allowance_pay:
 *                       type: number
 *                     paid_days:
 *                       type: number
 *                     begin_date:
 *                       type: string
 *                       format: date
 *                     employee_id:
 *                       type: number
 *                 token:
 *                   type: string
 *                   description: JWT token to send in the Authorization header as Bearer token
 *       400:
 *         description: Bad request
 *       403:
 *         description: Role is not allowed for mobile app
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/login/web:
 *   post:
 *     summary: Login for dashboard
 *     tags: [Login]
 *     description: Authenticate a dashboard user and return user information plus a JWT token. Allowed roles are ADMIN and SUPER_ADMIN.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - password
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
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
 *                     user_name:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                     position:
 *                       type: string
 *                     dob:
 *                       type: string
 *                       format: date
 *                     role:
 *                       type: string
 *                       example: "ADMIN"
 *                     is_admin:
 *                       type: boolean
 *                     department:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         name:
 *                           type: string
 *                     is_officer:
 *                       type: boolean
 *                     department_id:
 *                       type: string
 *                       format: uuid
 *                     is_offical_staff:
 *                       type: boolean
 *                     salary_hourly:
 *                       type: number
 *                     shift_night_pay:
 *                       type: number
 *                     travel_allowance_pay:
 *                       type: number
 *                     paid_days:
 *                       type: number
 *                     begin_date:
 *                       type: string
 *                       format: date
 *                     employee_id:
 *                       type: number
 *                 token:
 *                   type: string
 *                   description: JWT token to send in the Authorization header as Bearer token
 *       400:
 *         description: Bad request
 *       403:
 *         description: Role is not allowed for dashboard
 *       500:
 *         description: Server error
 */
