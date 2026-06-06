"use strict";
/**
 * @swagger
 * tags:
 *   name: ErrorOfReports
 *   description: API for managing errors of reports
 */
/**
 * @swagger
 * /api/version/v1/error-of-report/findByDailyReportId:
 *   post:
 *     summary: Find errors of a daily report
 *     tags: [ErrorOfReports]
 *     description: Retrieve errors associated with a specific daily report by its ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - daily_report_id
 *             properties:
 *               daily_report_id:
 *                 type: string
 *                 format: uuid
 *                 description: UUID of the daily report
 *                 example: "5ef9f5a2-9c6f-4e95-a8be-1d4b2f667233"
 *     responses:
 *       202:
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
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "4ce450e7-b4f4-44dd-98f6-5b8f2d4cb775"
 *                       code:
 *                         type: string
 *                         example: "C01"
 *                       description:
 *                         type: string
 *                         example: "Machine stopped due to sensor issue"
 *                       shutdown_time:
 *                         type: number
 *                         example: 15
 *                       error_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-05-10T00:00:00.000Z"
 *                       daily_report_id:
 *                         type: string
 *                         format: uuid
 *                         example: "5ef9f5a2-9c6f-4e95-a8be-1d4b2f667233"
 *       200:
 *         description: Business-level failure response from use case
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
 *         description: Bad request (missing or invalid daily_report_id in body)
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
 *                   example: "dailyReportId is required"
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
