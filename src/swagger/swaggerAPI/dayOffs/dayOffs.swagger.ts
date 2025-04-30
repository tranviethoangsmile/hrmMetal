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
 *             required:
 *               - date
 *               - user_id
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
 *               required:
 *                 - success
 *                 - data
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Details of the created day-off request
 *                   example:
 *                     id: "550e8400-e29b-41d4-a716-446655440000"
 *                     date: "2025-04-20"
 *                     user_id: "user123"
 *                     reason: "Vacation"
 *       200:
 *         description: Request processed but not successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - message
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
 *               required:
 *                 - success
 *                 - message
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
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "server error :: <error message>"
 */

/**
 * @swagger
 * /dayOff/getById:
 *   post:
 *     summary: Get day-off details by ID
 *     tags: [DayOff]
 *     description: Endpoint to retrieve details of a specific day-off record by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the day-off record to retrieve
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       202:
 *         description: Day-off record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - data
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Details of the day-off record
 *                   example:
 *                     id: "550e8400-e29b-41d4-a716-446655440000"
 *                     date: "2025-04-20"
 *                     user_id: "user123"
 *                     userDetail:
 *                       name: "John Doe"
 *                       avatar: "https://example.com/avatar.jpg"
 *       404:
 *         description: Day-off record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Day-off record not found"
 *       400:
 *         description: Bad request (e.g., missing or invalid ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "ID is required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "server error :: <error message>"
 */
/**
 * @swagger
 * /dayOff/deleteById:
 *   post:
 *     summary: Delete a day-off record by ID
 *     tags: [DayOff]
 *     description: Endpoint to delete a specific day-off record by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - user_id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the day-off record to delete
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               user_id:
 *                 type: string
 *                 description: The user_id of the admin record to delete
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       202:
 *         description: Day-off record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Day-off record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Day off with ID 550e8400-e29b-41d4-a716-446655440000 not found"
 *       400:
 *         description: Bad request (e.g., missing or invalid ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input: ID is required and must be a non-empty string"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "server error :: Unexpected error occurred"
 */
/**
 * @swagger
 * /dayOff/update:
 *   put:
 *     summary: Update a day-off record by ID
 *     tags: [DayOff]
 *     description: Endpoint to update a specific day-off record by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the day-off record to update
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The updated date of the day-off (ISO 8601 format)
 *                 example: "2025-04-20"
 *               user_id:
 *                 type: string
 *                 description: The ID of the user requesting the update
 *                 example: "user123"
 *     responses:
 *       202:
 *         description: Day-off record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: Update failed due to invalid data or other issues
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Day-off record not found or update failed"
 *       400:
 *         description: Bad request (e.g., missing or invalid ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "id is required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "server error :: Unexpected error occurred"
 */
