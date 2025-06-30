/**
 * @swagger
 * tags:
 *   name: Checkin
 *   description: API for managing employee check-in/check-out
 */

/**
 * @swagger
 * /checkin/create:
 *   post:
 *     summary: Create or update a check-in record
 *     tags: [Checkin]
 *     description: Create a new check-in record or update an existing one for check-out
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
 *               - check_time
 *               - work_shift
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user checking in/out
 *                 example: "user_id_123"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the check-in/out (YYYY-MM-DD)
 *                 example: "2024-03-20"
 *               check_time:
 *                 type: string
 *                 format: time
 *                 description: Time of check-in/out (HH:mm)
 *                 example: "08:30"
 *               work_shift:
 *                 type: string
 *                 enum: [DAY, NIGHT]
 *                 description: Work shift (DAY or NIGHT)
 *                 example: "DAY"
 *     responses:
 *       202:
 *         description: Check-in/out successful
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
 *                   example: "Server error: Internal server error"
 */

/**
 * @swagger
 * /checkin/search:
 *   post:
 *     summary: Search user's check-in records in a month
 *     tags: [Checkin]
 *     description: Get all check-in records for a user in a specific month
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
 *               - year
 *               - month
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user
 *                 example: "user_id_123"
 *               year:
 *                 type: number
 *                 description: Year to search
 *                 example: 2024
 *               month:
 *                 type: number
 *                 description: Month to search (1-12)
 *                 example: 3
 *     responses:
 *       202:
 *         description: Records found successfully
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
 *                         description: ID of the check-in record
 *                         example: "checkin_id_123"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date of check-in
 *                         example: "2024-03-20"
 *                       time_in:
 *                         type: string
 *                         format: time
 *                         description: Check-in time
 *                         example: "08:30"
 *                       time_out:
 *                         type: string
 *                         format: time
 *                         description: Check-out time
 *                         example: "17:30"
 *                       work_shift:
 *                         type: string
 *                         description: Work shift
 *                         example: "DAY"
 *                       work_time:
 *                         type: number
 *                         description: Total work hours
 *                         example: 8.5
 *                       over_time:
 *                         type: number
 *                         description: Overtime hours
 *                         example: 1.5
 *                       is_weekend:
 *                         type: boolean
 *                         description: Whether it's a weekend day
 *                         example: false
 *                       is_paid_leave:
 *                         type: boolean
 *                         description: Whether it's a paid leave day
 *                         example: false
 *                       User:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: User ID
 *                             example: "user_id_123"
 *                           name:
 *                             type: string
 *                             description: User's name
 *                             example: "John Doe"
 *                           employee_id:
 *                             type: string
 *                             description: Employee ID
 *                             example: "EMP123"
 *                           department:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 description: Department name
 *                                 example: "Engineering"
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
 *                   example: "Server error: Internal server error"
 */

/**
 * @swagger
 * /checkin/getcheckinindateofposition:
 *   post:
 *     summary: Get check-in records by position and date
 *     tags: [Checkin]
 *     description: Get all check-in records for employees in a specific position on a specific date
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
 *               - position
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date to search (YYYY-MM-DD)
 *                 example: "2024-03-20"
 *               position:
 *                 type: string
 *                 description: Position/role to search for
 *                 example: "Engineer"
 *     responses:
 *       202:
 *         description: Records found successfully
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
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         description: User ID
 *                         example: "user_id_123"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Check-in date
 *                         example: "2024-03-20"
 *                       work_shift:
 *                         type: string
 *                         description: Work shift
 *                         example: "DAY"
 *                       work_time:
 *                         type: number
 *                         description: Total work hours
 *                         example: 8.5
 *                       over_time:
 *                         type: number
 *                         description: Overtime hours
 *                         example: 1.5
 *                       time_in:
 *                         type: string
 *                         format: time
 *                         description: Check-in time
 *                         example: "08:30"
 *                       time_out:
 *                         type: string
 *                         format: time
 *                         description: Check-out time
 *                         example: "17:30"
 *                       is_weekend:
 *                         type: boolean
 *                         description: Whether it's a weekend day
 *                         example: false
 *                       is_paid_leave:
 *                         type: boolean
 *                         description: Whether it's a paid leave day
 *                         example: false
 *                       User:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: User's name
 *                             example: "John Doe"
 *                           role:
 *                             type: string
 *                             description: User's role
 *                             example: "Engineer"
 *                           employee_id:
 *                             type: string
 *                             description: Employee ID
 *                             example: "EMP123"
 *                           position:
 *                             type: string
 *                             description: User's position
 *                             example: "Engineer"
 *                           avatar:
 *                             type: string
 *                             description: URL to user's avatar
 *                             example: "https://example.com/avatar.jpg"
 *                           department:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 description: Department name
 *                                 example: "Engineering"
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
 *                   example: "Server error: Internal server error"
 */

/**
 * @swagger
 * /checkin/getcheckindetailindateofuser:
 *   post:
 *     summary: Get user's check-in details for a specific date
 *     tags: [Checkin]
 *     description: Get detailed check-in information for a specific user on a specific date
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
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user
 *                 example: "user_id_123"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date to get details for (YYYY-MM-DD)
 *                 example: "2024-03-20"
 *     responses:
 *       202:
 *         description: Details found successfully
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
 *                       description: Check-in record ID
 *                       example: "checkin_id_123"
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Check-in date
 *                       example: "2024-03-20"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: User ID
 *                       example: "user_id_123"
 *                     time_in:
 *                       type: string
 *                       format: time
 *                       description: Check-in time
 *                       example: "08:30"
 *                     work_shift:
 *                       type: string
 *                       description: Work shift
 *                       example: "DAY"
 *                     time_out:
 *                       type: string
 *                       format: time
 *                       description: Check-out time
 *                       example: "17:30"
 *                     work_time:
 *                       type: number
 *                       description: Total work hours
 *                       example: 8.5
 *                     over_time:
 *                       type: number
 *                       description: Overtime hours
 *                       example: 1.5
 *                     is_weekend:
 *                       type: boolean
 *                       description: Whether it's a weekend day
 *                       example: false
 *                     is_paid_leave:
 *                       type: boolean
 *                       description: Whether it's a paid leave day
 *                       example: false
 *                     User:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: User's name
 *                           example: "John Doe"
 *                         role:
 *                           type: string
 *                           description: User's role
 *                           example: "Engineer"
 *                         employee_id:
 *                           type: string
 *                           description: Employee ID
 *                           example: "EMP123"
 *                         position:
 *                           type: string
 *                           description: User's position
 *                           example: "Engineer"
 *                         avatar:
 *                           type: string
 *                           description: URL to user's avatar
 *                           example: "https://example.com/avatar.jpg"
 *                         department:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               description: Department name
 *                               example: "Engineering"
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
 *                   example: "Server error: Internal server error"
 */
