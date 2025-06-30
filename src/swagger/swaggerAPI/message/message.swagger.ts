/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API for managing chat messages
 */

/**
 * @swagger
 * /message/create:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     description: Send a new message in a conversation
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
 *               - message
 *               - message_type
 *             properties:
 *               conversation_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the conversation
 *                 example: "conversation_id_123"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the sender
 *                 example: "user_id_123"
 *               message:
 *                 type: string
 *                 description: Message content
 *                 example: "Hello everyone!"
 *               message_type:
 *                 type: string
 *                 enum: [TEXT, IMAGE, FILE]
 *                 description: Type of message
 *                 example: "TEXT"
 *     responses:
 *       201:
 *         description: Message created successfully
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
 *                       description: Message ID
 *                       example: "message_id_123"
 *                     message:
 *                       type: string
 *                       description: Message content
 *                       example: "Hello everyone!"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: Sender ID
 *                       example: "user_id_123"
 *                     conversation_id:
 *                       type: string
 *                       format: uuid
 *                       description: Conversation ID
 *                       example: "conversation_id_123"
 *                     message_type:
 *                       type: string
 *                       description: Type of message
 *                       example: "TEXT"
 *                     is_unsend:
 *                       type: boolean
 *                       description: Whether the message has been unsent
 *                       example: false
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           description: User ID
 *                           example: "user_id_123"
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
 *                   example: "server error: Internal server error"
 */

/**
 * @swagger
 * /message/searchmessageofconversation:
 *   post:
 *     summary: Get conversation messages
 *     tags: [Messages]
 *     description: Retrieve all messages from a specific conversation
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
 *             properties:
 *               conversation_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the conversation
 *                 example: "conversation_id_123"
 *     responses:
 *       202:
 *         description: Messages retrieved successfully
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
 *                         description: Message ID
 *                         example: "message_id_123"
 *                       message:
 *                         type: string
 *                         description: Message content
 *                         example: "Hello everyone!"
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         description: Sender ID
 *                         example: "user_id_123"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: When the message was sent
 *                         example: "2024-03-20T09:00:00Z"
 *                       is_unsend:
 *                         type: boolean
 *                         description: Whether the message has been unsent
 *                         example: false
 *                       message_type:
 *                         type: string
 *                         description: Type of message
 *                         example: "TEXT"
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: User ID
 *                             example: "user_id_123"
 *                           avatar:
 *                             type: string
 *                             description: URL to user's avatar
 *                             example: "https://example.com/avatar.jpg"
 *                       delete_messages:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               format: uuid
 *                               description: Delete message record ID
 *                               example: "delete_id_123"
 *                             user_id:
 *                               type: string
 *                               format: uuid
 *                               description: ID of user who deleted the message
 *                               example: "user_id_456"
 *                             message_id:
 *                               type: string
 *                               format: uuid
 *                               description: ID of the deleted message
 *                               example: "message_id_123"
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
 *                   example: "conversation_id is required"
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

/**
 * @swagger
 * /message/delete:
 *   post:
 *     summary: Delete a message
 *     tags: [Messages]
 *     description: Delete a message for a specific user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message_id
 *               - user_id
 *             properties:
 *               message_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the message to delete
 *                 example: "message_id_123"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user deleting the message
 *                 example: "user_id_123"
 *     responses:
 *       201:
 *         description: Message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Message deleted successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
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
 *                   example: "server error: Internal server error"
 */

/**
 * @swagger
 * /message/unsend:
 *   post:
 *     summary: Unsend a message
 *     tags: [Messages]
 *     description: Mark a message as unsent (can only be done by the sender)
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
 *                 description: ID of the message to unsend
 *                 example: "message_id_123"
 *     responses:
 *       202:
 *         description: Message unsent successfully
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
 *                   example: "Internal server error"
 */
