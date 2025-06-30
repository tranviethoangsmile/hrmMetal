/**
 * @swagger
 * tags:
 *   name: Event Checks
 *   description: API for managing event participation confirmations
 */

/**
 * @swagger
 * /eventcheck/create:
 *   post:
 *     summary: Create an event check
 *     tags: [Event Checks]
 *     description: Create a new event participation confirmation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - user_id
 *               - is_confirm
 *             properties:
 *               event_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the event
 *                 example: "event_id_123"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user confirming participation
 *                 example: "user_id_123"
 *               is_confirm:
 *                 type: boolean
 *                 description: Whether the user confirms participation
 *                 example: true
 *     responses:
 *       201:
 *         description: Event check created successfully
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
 *                       description: ID of the created event check
 *                       example: "check_id_123"
 *                     event_id:
 *                       type: string
 *                       format: uuid
 *                       description: Event ID
 *                       example: "event_id_123"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: User ID
 *                       example: "user_id_123"
 *                     is_confirm:
 *                       type: boolean
 *                       description: Confirmation status
 *                       example: true
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
 *                   example: "Invalid input: Missing required event_id, is_confirm, user_id"
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
 *                   example: "server: Internal server error"
 */

/**
 * @swagger
 * /eventcheck/searcheventchecked:
 *   post:
 *     summary: Search event check
 *     tags: [Event Checks]
 *     description: Check if a user has confirmed participation in an event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - user_id
 *             properties:
 *               event_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the event to check
 *                 example: "event_id_123"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user to check
 *                 example: "user_id_123"
 *     responses:
 *       202:
 *         description: Event check found successfully
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
 *                       description: ID of the event check
 *                       example: "check_id_123"
 *                     event_id:
 *                       type: string
 *                       format: uuid
 *                       description: Event ID
 *                       example: "event_id_123"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: User ID
 *                       example: "user_id_123"
 *                     is_confirm:
 *                       type: boolean
 *                       description: Whether the user confirmed participation
 *                       example: true
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
 *                   example: "Bad Request"
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
 *                   example: "server: Internal server error"
 */
