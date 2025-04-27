/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Endpoint to create a new user. All fields are required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - user_name
 *               - password
 *               - dob
 *               - employee_id
 *               - department_id
 *               - salary_hourly
 *               - travel_allowance_pay
 *               - shift_night_pay
 *               - paid_days
 *               - role
 *               - position
 *               - begin_date
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *                 example: "hoangdev2"
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: "string@gmail.com"
 *               user_name:
 *                 type: string
 *                 description: Username for the user
 *                 example: "hoangdev3"
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: "000000"
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: Date of birth (format -> yyyy-mm-dd)
 *                 example: "2025-04-20"
 *               employee_id:
 *                 type: number
 *                 description: Employee ID
 *                 example: 6962
 *               department_id:
 *                 type: string
 *                 description: Department ID (UUID format)
 *                 example: "cab9ec71-1a35-483a-bb64-a76f81080d46"
 *               salary_hourly:
 *                 type: number
 *                 description: Hourly salary of the user
 *                 example: 1000
 *               travel_allowance_pay:
 *                 type: number
 *                 description: Travel allowance pay
 *                 example: 1000
 *               shift_night_pay:
 *                 type: number
 *                 description: Night shift pay
 *                 example: 5000
 *               paid_days:
 *                 type: number
 *                 description: Number of paid days
 *                 example: 0
 *               role:
 *                 type: string
 *                 description: Role of the user
 *                 example: "ADMIN"
 *               position:
 *                 type: string
 *                 description: Position of the user
 *                 example: "HINO"
 *               begin_date:
 *                 type: string
 *                 format: date
 *                 description: Begin date of employment (format -> yyyy-mm-dd)
 *                 example: "2000-01-20"
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
 *                   type: object
 *                   description: Details of the created user
 *       200:
 *         description: Request processed but not successful
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
 *                   example: "User creation failed due to invalid data"
 *       400:
 *         description: Bad request (e.g., missing or invalid input)
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
 *                   example: "Invalid input: Missing required fields"
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
 *                   example: "Server error: <error message>"
 */
/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: API for uploading user avatars
 */

/**
 * @swagger
 * /upload-avatar:
 *   post:
 *     summary: Upload a user avatar
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user
 *                 example: "12345"
 *               media_path:
 *                 type: string
 *                 description: The path to the uploaded media file
 *                 example: "/uploads/avatar.png"
 *     responses:
 *       201:
 *         description: Avatar uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: Failed to upload avatar
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
 *                   example: "Failed to update user avatar"
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
 *                   example: "server error: <error message>"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users by department
 */

/**
 * @swagger
 * /getuserwithdepartmentid:
 *   post:
 *     summary: Get users by department ID
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               department_id:
 *                 type: string
 *                 description: The ID of the department
 *                 example: "dept123"
 *     responses:
 *       202:
 *         description: Successfully retrieved users
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
 *                         description: User ID
 *                       name:
 *                         type: string
 *                         description: User name
 *                       email:
 *                         type: string
 *                         description: User email
 *       200:
 *         description: Failed to retrieve users
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
 *                   example: "No users found"
 *       400:
 *         description: Bad request (missing department_id)
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
 *                   example: "data not empty"
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
 *                   example: "server error: <error message>"
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users by department
 */

/**
 * @swagger
 * /getuserwithdepartmentid:
 *   post:
 *     summary: Get users by department ID
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               department_id:
 *                 type: string
 *                 description: The ID of the department
 *                 example: "dept123"
 *     responses:
 *       202:
 *         description: Successfully retrieved users
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
 *                         description: User ID
 *                       name:
 *                         type: string
 *                         description: User name
 *                       email:
 *                         type: string
 *                         description: User email
 *       200:
 *         description: Failed to retrieve users
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
 *                   example: "No users found"
 *       400:
 *         description: Bad request (missing department_id)
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
 *                   example: "data not empty"
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
 *                   example: "server error: <error message>"
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for finding users by specific fields
 */

/**
 * @swagger
 * /finduserwithfield:
 *   post:
 *     summary: Find users by specific fields
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Object containing fields to filter users
 *             example:
 *               department_id: "dept123"
 *               role: "admin"
 *     responses:
 *       202:
 *         description: Successfully found users
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
 *                         description: User ID
 *                       name:
 *                         type: string
 *                         description: User name
 *                       email:
 *                         type: string
 *                         description: User email
 *       400:
 *         description: Bad request (missing or empty fields)
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
 *                   example: "data not empty"
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
 *                   example: "server error: <error message>"
 */
