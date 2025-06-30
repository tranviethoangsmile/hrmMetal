/**
 * @swagger
 * tags:
 *   name: Daily Reports
 *   description: API for managing daily production reports
 */

/**
 * @swagger
 * /dailyreport/create:
 *   post:
 *     summary: Create a new daily report
 *     tags: [Daily Reports]
 *     description: Create a new daily production report with operator history and error codes
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
 *               - operated_time
 *               - operator_history
 *               - product
 *               - shift
 *               - quantity
 *               - shutdown_time
 *               - user_id
 *               - department_id
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the report (YYYY-MM-DD)
 *                 example: "2024-03-20"
 *               operated_time:
 *                 type: number
 *                 description: Total operation time in hours
 *                 example: 8.5
 *               operator_history:
 *                 type: string
 *                 description: History of operators during the shift
 *                 example: "John (8:00-12:00), Jane (12:00-16:30)"
 *               product:
 *                 type: string
 *                 description: Product being produced
 *                 example: "Product A"
 *               shift:
 *                 type: string
 *                 enum: [DAY, NIGHT]
 *                 description: Work shift
 *                 example: "DAY"
 *               quantity:
 *                 type: number
 *                 description: Quantity produced
 *                 example: 1000
 *               shutdown_time:
 *                 type: number
 *                 description: Total shutdown time in hours
 *                 example: 0.5
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user creating the report
 *                 example: "user_id_123"
 *               department_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the department
 *                 example: "dept_id_123"
 *     responses:
 *       201:
 *         description: Daily report created successfully
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
 *                       description: ID of the created report
 *                       example: "report_id_123"
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Report date
 *                       example: "2024-03-20"
 *                     product:
 *                       type: string
 *                       description: Product name
 *                       example: "Product A"
 *                     shift:
 *                       type: string
 *                       description: Work shift
 *                       example: "DAY"
 *                     quantity:
 *                       type: number
 *                       description: Quantity produced
 *                       example: 1000
 *                     operated_time:
 *                       type: number
 *                       description: Operation time
 *                       example: 8.5
 *                     shutdown_time:
 *                       type: number
 *                       description: Shutdown time
 *                       example: 0.5
 *                     operator_history:
 *                       type: string
 *                       description: Operator history
 *                       example: "John (8:00-12:00), Jane (12:00-16:30)"
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
 *                   example: "Invalid input: Missing required date, operated_time"
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
 * /dailyreport/getall:
 *   post:
 *     summary: Get all daily reports with filters
 *     tags: [Daily Reports]
 *     description: Retrieve all daily reports with optional filters for date, department, product, shift, and user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Filter by date (YYYY-MM-DD)
 *                 example: "2024-03-20"
 *               department_id:
 *                 type: string
 *                 format: uuid
 *                 description: Filter by department ID
 *                 example: "dept_id_123"
 *               product:
 *                 type: string
 *                 description: Filter by product name
 *                 example: "Product A"
 *               shift:
 *                 type: string
 *                 enum: [DAY, NIGHT]
 *                 description: Filter by shift
 *                 example: "DAY"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: Filter by user ID
 *                 example: "user_id_123"
 *     responses:
 *       202:
 *         description: Reports retrieved successfully
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
 *                       product:
 *                         type: string
 *                         description: Product name
 *                         example: "Product A"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Report date
 *                         example: "2024-03-20"
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         description: User ID
 *                         example: "user_id_123"
 *                       shift:
 *                         type: string
 *                         description: Work shift
 *                         example: "DAY"
 *                       quantity:
 *                         type: number
 *                         description: Quantity produced
 *                         example: 1000
 *                       operated_time:
 *                         type: number
 *                         description: Operation time
 *                         example: 8.5
 *                       shutdown_time:
 *                         type: number
 *                         description: Shutdown time
 *                         example: 0.5
 *                       operator_history:
 *                         type: string
 *                         description: Operator history
 *                         example: "John (8:00-12:00), Jane (12:00-16:30)"
 *                       department_id:
 *                         type: string
 *                         format: uuid
 *                         description: Department ID
 *                         example: "dept_id_123"
 *                       User:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: User's name
 *                             example: "John Doe"
 *                           department:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 description: Department name
 *                                 example: "Production"
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
 *                   example: "Server Error router: Internal server error"
 */

/**
 * @swagger
 * /dailyreport/search:
 *   post:
 *     summary: Search daily reports
 *     tags: [Daily Reports]
 *     description: Search daily reports with detailed information including error codes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Filter by date (YYYY-MM-DD)
 *                 example: "2024-03-20"
 *               department_id:
 *                 type: string
 *                 format: uuid
 *                 description: Filter by department ID
 *                 example: "dept_id_123"
 *               product:
 *                 type: string
 *                 description: Filter by product name
 *                 example: "Product A"
 *               shift:
 *                 type: string
 *                 enum: [DAY, NIGHT]
 *                 description: Filter by shift
 *                 example: "DAY"
 *     responses:
 *       202:
 *         description: Reports found successfully
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
 *                       product:
 *                         type: string
 *                         description: Product name
 *                         example: "Product A"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Report date
 *                         example: "2024-03-20"
 *                       shift:
 *                         type: string
 *                         description: Work shift
 *                         example: "DAY"
 *                       quantity:
 *                         type: number
 *                         description: Quantity produced
 *                         example: 1000
 *                       operated_time:
 *                         type: number
 *                         description: Operation time
 *                         example: 8.5
 *                       shutdown_time:
 *                         type: number
 *                         description: Shutdown time
 *                         example: 0.5
 *                       active_time:
 *                         type: number
 *                         description: Active production time
 *                         example: 8.0
 *                       operator_history:
 *                         type: string
 *                         description: Operator history
 *                         example: "John (8:00-12:00), Jane (12:00-16:30)"
 *                       User:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: User's name
 *                             example: "John Doe"
 *                           department:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 description: Department name
 *                                 example: "Production"
 *                       CodeError:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             code:
 *                               type: string
 *                               description: Error code
 *                               example: "ERR001"
 *                             description:
 *                               type: string
 *                               description: Error description
 *                               example: "Machine malfunction"
 *                             shutdown_time:
 *                               type: number
 *                               description: Duration of shutdown due to this error
 *                               example: 0.5
 *                             daily_report_id:
 *                               type: string
 *                               format: uuid
 *                               description: ID of the daily report
 *                               example: "report_id_123"
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
 *                   example: "server error: Internal server error"
 */

/**
 * @swagger
 * /dailyreport/{id}:
 *   get:
 *     summary: Get daily report by ID
 *     tags: [Daily Reports]
 *     description: Get detailed information about a specific daily report
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the daily report
 *         example: "report_id_123"
 *     responses:
 *       201:
 *         description: Report found successfully
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
 *                     product:
 *                       type: string
 *                       description: Product name
 *                       example: "Product A"
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Report date
 *                       example: "2024-03-20"
 *                     shift:
 *                       type: string
 *                       description: Work shift
 *                       example: "DAY"
 *                     quantity:
 *                       type: number
 *                       description: Quantity produced
 *                       example: 1000
 *                     operator_history:
 *                       type: string
 *                       description: Operator history
 *                       example: "John (8:00-12:00), Jane (12:00-16:30)"
 *                     operated_time:
 *                       type: number
 *                       description: Operation time
 *                       example: 8.5
 *                     shutdown_time:
 *                       type: number
 *                       description: Shutdown time
 *                       example: 0.5
 *                     active_time:
 *                       type: number
 *                       description: Active production time
 *                       example: 8.0
 *                     user:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: User's name
 *                           example: "John Doe"
 *                         department:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                               description: Department name
 *                               example: "Production"
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
 *                   example: "id not empty"
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
