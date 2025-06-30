/**
 * @swagger
 * tags:
 *   name: Login
 *   description: API for user authentication
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Login]
 *     description: Authenticate a user and return user information and access token if successful
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
 *                 description: Username of the user
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: Password of the user
 *                 example: "password123"
 *     responses:
 *       202:
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
 *                       description: User ID
 *                       example: "user_id_123"
 *                     name:
 *                       type: string
 *                       description: Full name of the user
 *                       example: "John Doe"
 *                     user_name:
 *                       type: string
 *                       description: Username
 *                       example: "john_doe"
 *                     avatar:
 *                       type: string
 *                       description: URL to user's avatar
 *                       example: "https://example.com/avatar.jpg"
 *                     position:
 *                       type: string
 *                       description: User's position in the company
 *                       example: "Developer"
 *                     dob:
 *                       type: string
 *                       format: date
 *                       description: Date of birth
 *                       example: "1990-01-01"
 *                     role:
 *                       type: string
 *                       description: User's role
 *                       example: "STAFF"
 *                     is_admin:
 *                       type: boolean
 *                       description: Whether the user has admin privileges
 *                       example: false
 *                     department:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: Name of the user's department
 *                           example: "Engineering"
 *                     is_officer:
 *                       type: boolean
 *                       description: Whether the user is an officer
 *                       example: false
 *                     department_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the user's department
 *                       example: "dept_id_123"
 *                     is_offical_staff:
 *                       type: boolean
 *                       description: Whether the user is an official staff member
 *                       example: true
 *                     salary_hourly:
 *                       type: number
 *                       description: Hourly salary rate
 *                       example: 25.5
 *                     shift_night_pay:
 *                       type: number
 *                       description: Night shift payment rate
 *                       example: 30
 *                     travel_allowance_pay:
 *                       type: number
 *                       description: Travel allowance amount
 *                       example: 100
 *                     paid_days:
 *                       type: number
 *                       description: Number of paid days
 *                       example: 20
 *                     begin_date:
 *                       type: string
 *                       format: date
 *                       description: Employment start date
 *                       example: "2023-01-01"
 *                     employee_id:
 *                       type: string
 *                       description: Employee identification number
 *                       example: "EMP123"
 *                 token:
 *                   type: string
 *                   description: JWT authentication token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       200:
 *         description: Login failed
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
 *                   example: "Password wrong...!!!"
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
 *                   example: "Missing values: password, user_name"
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
 *                   example: "server error: Internal server error"
 */
