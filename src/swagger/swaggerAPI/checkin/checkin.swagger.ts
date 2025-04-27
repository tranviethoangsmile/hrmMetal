/**
 * @swagger
 * tags:
 *   name: Checkins
 *   description: "API for managing employee check-ins"
 */

/**
 * @swagger
 * /checkin/create:
 *   post:
 *     summary: "Create a new check-in or check-out"
 *     tags: [Checkins]
 *     description: "Endpoint to create a new check-in or check-out record for an employee."
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
 *                 description: "ID of the user checking in or out"
 *                 example: "user123"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: "Date of the check-in or check-out (format: YYYY-MM-DD)"
 *                 example: "2025-04-20"
 *               check_time:
 *                 type: string
 *                 format: time
 *                 description: "Time of the check-in or check-out (format: HH:mm)"
 *                 example: "08:00"
 *               work_shift:
 *                 type: string
 *                 description: "Work shift of the user (e.g., DAY, NIGHT)"
 *                 example: "DAY"
 *     responses:
 *       201:
 *         description: "Check-in or check-out created successfully"
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
 *                   description: "Details of the created check-in or check-out"
 *       202:
 *         description: "Check-in or check-out already exists"
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
 *                   example: "checked"
 *       200:
 *         description: "Check-in or check-out failed due to invalid data or other issues"
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
 *                   example: "checkin unSuccess"
 *       400:
 *         description: "Bad request (e.g., missing or invalid input)"
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
 *         description: "Server error"
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
 * /checkin/search:
 *   get:
 *     summary: "Search check-ins of a user in a month"
 *     tags: [Checkins]
 *     description: "Retrieve all check-ins of a specific user within a given month."
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID of the user"
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: "Month to filter check-ins (format: YYYY-MM)"
 *     responses:
 *       200:
 *         description: "List of check-ins retrieved successfully"
 *       400:
 *         description: "Bad request"
 *       500:
 *         description: "Server error"
 */

/**
 * @swagger
 * /checkin/getcheckinindateofposition:
 *   get:
 *     summary: "Get check-ins by position on a specific date "
 *     tags: [Checkins]
 *     description: "Retrieve all check-ins for a specific position on a given date."
 *     parameters:
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         required: true
 *         description: "Position to filter check-ins"
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: "Date to filter check-ins (format: YYYY-MM-DD)"
 *     responses:
 *       200:
 *         description: "List of check-ins retrieved successfully"
 *       400:
 *         description: "Bad request"
 *       500:
 *         description: "Server error"
 */

/**
 * @swagger
 * /checkin/getcheckindetailindateofuser:
 *   get:
 *     summary: "Get detailed check-ins of a user on a specific date"
 *     tags: [Checkins]
 *     description: "Retrieve detailed check-in records of a specific user on a given date."
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID of the user"
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: "Date to filter check-ins (format: YYYY-MM-DD)"
 *     responses:
 *       200:
 *         description: "Detailed check-ins retrieved successfully"
 *       400:
 *         description: "Bad request"
 *       500:
 *         description: "Server error"
 */
