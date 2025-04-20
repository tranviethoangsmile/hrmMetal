/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: API for managing conversations
 */

/**
 * @swagger
 * /conversation/create:
 *   post:
 *     summary: Create a new conversation
 *     tags: [Conversations]
 *     description: Endpoint to create a new conversation between users.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of user IDs participating in the conversation
 *                 example: ["user123", "user456"]
 *               title:
 *                 type: string
 *                 description: Title of the conversation
 *                 example: "Project Discussion"
 *     responses:
 *       201:
 *         description: Conversation created successfully
 *       400:
 *         description: Bad request (e.g., missing data)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /conversation/delete:
 *   delete:
 *     summary: Delete a conversation
 *     tags: [Conversations]
 *     description: Delete a conversation by its ID.
 *     parameters:
 *       - in: query
 *         name: conversation_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the conversation to delete
 *         example: "conv123"
 *     responses:
 *       200:
 *         description: Conversation deleted successfully
 *       400:
 *         description: Bad request (e.g., missing or invalid conversation_id)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /conversation/creategroup:
 *   post:
 *     summary: Create a group conversation
 *     tags: [Conversations]
 *     description: Endpoint to create a new group conversation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_name:
 *                 type: string
 *                 description: Name of the group conversation
 *                 example: "Team Alpha"
 *               user_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of user IDs in the group
 *                 example: ["user123", "user456", "user789"]
 *     responses:
 *       201:
 *         description: Group conversation created successfully
 *       400:
 *         description: Bad request (e.g., missing data)
 *       500:
 *         description: Server error
 */
