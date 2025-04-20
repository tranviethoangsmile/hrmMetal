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
 *     summary: "Create a new check-in"
 *     tags: [Checkins]
 *     description: "Endpoint to create a new check-in record for an employee."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: "ID of the user checking in"
 *                 example: "user123"
 *               checkin_time:
 *                 type: string
 *                 format: date-time
 *                 description: "Time of the check-in"
 *                 example: "2025-04-20T08:00:00Z"
 *               location:
 *                 type: string
 *                 description: "Location of the check-in"
 *                 example: "Office A"
 *     responses:
 *       201:
 *         description: "Check-in created successfully"
 *       400:
 *         description: "Bad request (e.g., missing data)"
 *       500:
 *         description: "Server error"
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
 *     summary: "Get check-ins by position on a specific date"
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
