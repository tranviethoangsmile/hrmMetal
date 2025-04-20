/**
 * @swagger
 * tags:
 *   name: ErrorOfReports
 *   description: API for managing errors of reports
 */

/**
 * @swagger
 * /errorOfReport:
 *   post:
 *     summary: Find errors of a daily report
 *     tags: [ErrorOfReports]
 *     description: Retrieve errors associated with a specific daily report by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               daily_report_id:
 *                 type: string
 *                 description: ID of the daily report
 *                 example: "report123"
 *     responses:
 *       201:
 *         description: Errors retrieved successfully
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
 *                       error_id:
 *                         type: string
 *                         description: ID of the error
 *                       description:
 *                         type: string
 *                         description: Description of the error
 *       200:
 *         description: No errors found or request failed
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
 *                   example: "No errors found"
 *       400:
 *         description: Bad request (missing or invalid daily_report_id)
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
 *                   example: "daily_report_id not empty"
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
