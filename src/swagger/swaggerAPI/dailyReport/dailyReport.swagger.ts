/**
 * @swagger
 * tags:
 *   name: DailyReports
 *   description: API for managing daily reports
 */

/**
 * @swagger
 * /dailyReport:
 *   post:
 *     summary: Create a new daily report
 *     tags: [DailyReports]
 *     description: Endpoint to create a new daily report.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the daily report
 *                 example: "Daily Production Report"
 *               content:
 *                 type: string
 *                 description: Content of the daily report
 *                 example: "Details about today's production activities."
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the report
 *                 example: "2025-04-20"
 *     responses:
 *       201:
 *         description: Daily report created successfully
 *       400:
 *         description: Bad request (e.g., missing data)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /dailyReport/{id}:
 *   get:
 *     summary: Get a daily report by ID
 *     tags: [DailyReports]
 *     description: Retrieve details of a specific daily report by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the daily report
 *     responses:
 *       201:
 *         description: Daily report details retrieved successfully
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
 *                       description: ID of the daily report
 *                     title:
 *                       type: string
 *                       description: Title of the daily report
 *                     content:
 *                       type: string
 *                       description: Content of the daily report
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Date of the report
 *       400:
 *         description: Bad request (e.g., invalid ID)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /dailyReport/create:
 *   post:
 *     summary: Create a daily report (sub-route)
 *     tags: [DailyReports]
 *     description: Create a new daily report using the `/create` sub-route.
 *     responses:
 *       201:
 *         description: Daily report created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /dailyReport/getall:
 *   get:
 *     summary: Get all daily reports
 *     tags: [DailyReports]
 *     description: Retrieve a list of all daily reports.
 *     responses:
 *       200:
 *         description: List of daily reports retrieved successfully
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
 *                         description: ID of the daily report
 *                       title:
 *                         type: string
 *                         description: Title of the daily report
 *                       content:
 *                         type: string
 *                         description: Content of the daily report
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date of the report
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /dailyReport/search:
 *   get:
 *     summary: Search daily reports
 *     tags: [DailyReports]
 *     description: Search for daily reports using specific criteria.
 *     responses:
 *       200:
 *         description: List of matching daily reports retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
