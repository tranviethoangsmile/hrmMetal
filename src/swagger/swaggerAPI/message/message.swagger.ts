/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API for managing messages
 */

/**
 * @swagger
 * /message/create:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     description: Endpoint to create a new message in a conversation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conversation_id:
 *                 type: string
 *                 description: ID of the conversation
 *                 example: "conv123"
 *               sender_id:
 *                 type: string
 *                 description: ID of the sender
 *                 example: "user456"
 *               content:
 *                 type: string
 *                 description: Content of the message
 *                 example: "Hello, how are you?"
 *     responses:
 *       201:
 *         description: Message created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /message/searchmessageofconversation:
 *   get:
 *     summary: Get all messages of a conversation
 *     tags: [Messages]
 *     description: Retrieve all messages in a specific conversation.
 *     parameters:
 *       - in: query
 *         name: conversation_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the conversation
 *     responses:
 *       200:
 *         description: List of messages retrieved successfully
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
 *                       message_id:
 *                         type: string
 *                         description: ID of the message
 *                       sender_id:
 *                         type: string
 *                         description: ID of the sender
 *                       content:
 *                         type: string
 *                         description: Content of the message
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of the message
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /message/unsend:
 *   delete:
 *     summary: Unsend a message
 *     tags: [Messages]
 *     description: Remove a message from a conversation by its ID.
 *     parameters:
 *       - in: query
 *         name: message_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the message to unsend
 *     responses:
 *       200:
 *         description: Message unsent successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /message/delete:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     description: Permanently delete a message by its ID.
 *     parameters:
 *       - in: query
 *         name: message_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the message to delete
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
