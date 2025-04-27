/**
 * @swagger
 * tags:
 *   name: DayOff
 *   description: API for managing employee day-off requests
 */

/**
 * @swagger
 * /dayOff:
 *   post:
 *     summary: Create a new day-off request
 *     tags: [DayOff]
 *     description: Endpoint to create a new day-off request for an employee.
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
 *                 description: The date of the day-off
 *                 example: "2025-04-20"
 *               user_id:
 *                 type: string
 *                 description: The ID of the user requesting the day-off
 *                 example: "user123"
 *     responses:
 *       201:
 *         description: Day-off request created successfully
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
 *                   description: Details of the created day-off request
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
 *                   example: "Day-off request could not be processed"
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
 *                   example: "Invalid input: Request body is required"
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
 *                   example: "server error :: <error message>"
 */
