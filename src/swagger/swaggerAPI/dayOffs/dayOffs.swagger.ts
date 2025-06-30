/**
 * @swagger
 * tags:
 *   name: Day Offs
 *   description: API for managing company holidays and days off
 */

/**
 * @swagger
 * /dayoffs/create:
 *   post:
 *     summary: Create a new day off
 *     tags: [Day Offs]
 *     description: Create a new day off record (Admin only)
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
 *               - user_id
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the day off (YYYY-MM-DD)
 *                 example: "2024-03-20"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user who will be off
 *                 example: "user_id_123"
 *     responses:
 *       201:
 *         description: Day off created successfully
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
 *                       description: ID of the created day off record
 *                       example: "dayoff_id_123"
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Date of the day off
 *                       example: "2024-03-20"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the user
 *                       example: "user_id_123"
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
 *                   example: "Invalid input: Request body is required"
 *       401:
 *         description: Unauthorized (not an admin)
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
 *                   example: "Unauthorized: Admin access required"
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
 *                   example: "server error :: Internal server error"
 */

/**
 * @swagger
 * /dayoffs/getall:
 *   get:
 *     summary: Get all days off
 *     tags: [Day Offs]
 *     description: Retrieve a list of all days off with user details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Days off retrieved successfully
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
 *                         description: ID of the day off record
 *                         example: "dayoff_id_123"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date of the day off
 *                         example: "2024-03-20"
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         description: ID of the user
 *                         example: "user_id_123"
 *                       userDetail:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: Name of the user
 *                             example: "John Doe"
 *                           avatar:
 *                             type: string
 *                             description: URL to user's avatar
 *                             example: "https://example.com/avatar.jpg"
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
 *                   example: "serrver error :: Internal server error"
 */

/**
 * @swagger
 * /dayoffs/getbyid:
 *   post:
 *     summary: Get day off by ID
 *     tags: [Day Offs]
 *     description: Get detailed information about a specific day off record
 *     security:
 *       - bearerAuth: []
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
 *                 description: ID of the day off record
 *                 example: "dayoff_id_123"
 *     responses:
 *       202:
 *         description: Day off found successfully
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
 *                       description: ID of the day off record
 *                       example: "dayoff_id_123"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the user
 *                       example: "user_id_123"
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Date of the day off
 *                       example: "2024-03-20"
 *                     userDetail:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: Name of the user
 *                           example: "John Doe"
 *                         avatar:
 *                           type: string
 *                           description: URL to user's avatar
 *                           example: "https://example.com/avatar.jpg"
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
 *                   example: "ID is required"
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
 *                   example: "server error:: Internal server error"
 */

/**
 * @swagger
 * /dayoffs/deletebyid:
 *   post:
 *     summary: Delete day off by ID
 *     tags: [Day Offs]
 *     description: Delete a specific day off record (Admin only)
 *     security:
 *       - bearerAuth: []
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
 *                 description: ID of the day off record to delete
 *                 example: "dayoff_id_123"
 *     responses:
 *       202:
 *         description: Day off deleted successfully
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
 *                   example: "Invalid input: ID is required and must be a non-empty string"
 *       401:
 *         description: Unauthorized (not an admin)
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
 *                   example: "Unauthorized: Admin access required"
 *       404:
 *         description: Day off not found
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
 *                   example: "Day off with ID dayoff_id_123 not found"
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
 *                   example: "server error :: Internal server error"
 */

/**
 * @swagger
 * /dayoffs/update:
 *   put:
 *     summary: Update day off
 *     tags: [Day Offs]
 *     description: Update a day off record
 *     security:
 *       - bearerAuth: []
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
 *                 description: ID of the day off record to update
 *                 example: "dayoff_id_123"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: New date for the day off (YYYY-MM-DD)
 *                 example: "2024-03-21"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: New user ID for the day off
 *                 example: "user_id_456"
 *     responses:
 *       202:
 *         description: Day off updated successfully
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
 *                   example: "id is required"
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
 *                   example: "server error :: Internal server error"
 */
