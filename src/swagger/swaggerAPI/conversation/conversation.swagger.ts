/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: API for managing conversations and chat
 */

/**
 * @swagger
 * /conversations/create:
 *   post:
 *     summary: Create a new one-on-one conversation
 *     tags: [Conversations]
 *     description: Create a new conversation between two users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sender_id
 *               - receiver_id
 *             properties:
 *               sender_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user creating the conversation
 *                 example: "user_id_123"
 *               receiver_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user to chat with
 *                 example: "user_id_456"
 *               title:
 *                 type: string
 *                 description: Optional title for the conversation
 *                 example: "Project Discussion"
 *     responses:
 *       201:
 *         description: Conversation created successfully
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
 *                       description: ID of the created conversation
 *                       example: "conv_id_123"
 *                     title:
 *                       type: string
 *                       description: Title of the conversation
 *                       example: "Project Discussion"
 *                     member_count:
 *                       type: number
 *                       description: Number of members in the conversation
 *                       example: 2
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: When the conversation was created
 *                       example: "2024-03-20T10:30:00Z"
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
 *                   example: "Server error: Internal server error"
 */

/**
 * @swagger
 * /conversations/creategroup:
 *   post:
 *     summary: Create a new group conversation
 *     tags: [Conversations]
 *     description: Create a new group conversation with multiple users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - sender_id
 *               - receivers
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the group conversation
 *                 example: "Project Team Chat"
 *               sender_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user creating the group
 *                 example: "user_id_123"
 *               receivers:
 *                 type: array
 *                 description: Array of user IDs to add to the group (minimum 2 users)
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example: ["user_id_456", "user_id_789"]
 *     responses:
 *       201:
 *         description: Group conversation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 conversation_id:
 *                   type: string
 *                   format: uuid
 *                   description: ID of the created group conversation
 *                   example: "conv_id_123"
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
 *                   example: "Missing required fields"
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
 *                   example: "--server error-- Internal server error"
 */

/**
 * @swagger
 * /conversations/delete:
 *   post:
 *     summary: Delete a conversation
 *     tags: [Conversations]
 *     description: Delete a conversation for a specific user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversation_id
 *               - user_id
 *             properties:
 *               conversation_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the conversation to delete
 *                 example: "conv_id_123"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user deleting the conversation
 *                 example: "user_id_123"
 *     responses:
 *       201:
 *         description: Conversation deleted successfully
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
 *                       description: ID of the delete record
 *                       example: "del_id_123"
 *                     conversation_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the deleted conversation
 *                       example: "conv_id_123"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the user who deleted
 *                       example: "user_id_123"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: When the conversation was deleted
 *                       example: "2024-03-20T10:30:00Z"
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
 *                   example: "bad request"
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
