/**
 * @swagger
 * tags:
 *   name: Group Members
 *   description: API for managing group chat members
 */

/**
 * @swagger
 * /groupmember/getgroupmemberofuser:
 *   post:
 *     summary: Get group members of a user
 *     tags: [Group Members]
 *     description: Retrieve the list of group members from all conversations that a user is part of
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user
 *                 example: "user_id_123"
 *     responses:
 *       202:
 *         description: Group members retrieved successfully
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
 *                         description: ID of the group member record
 *                         example: "member_id_123"
 *                       conversation_id:
 *                         type: string
 *                         format: uuid
 *                         description: ID of the conversation
 *                         example: "conversation_id_123"
 *                       joined_at:
 *                         type: string
 *                         format: date-time
 *                         description: When the member joined the group
 *                         example: "2024-03-20T09:00:00Z"
 *                       group_type:
 *                         type: string
 *                         enum: [PRIVATE, GROUP]
 *                         description: Type of the group
 *                         example: "GROUP"
 *                       conversation:
 *                         type: object
 *                         properties:
 *                           member_count:
 *                             type: integer
 *                             description: Number of members in the conversation
 *                             example: 5
 *                           title:
 *                             type: string
 *                             description: Title of the group conversation
 *                             example: "Project Team"
 *                           delete_conversations:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 user_id:
 *                                   type: string
 *                                   format: uuid
 *                                   description: ID of user who deleted the conversation
 *                                   example: "user_id_456"
 *                           messages:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 message:
 *                                   type: string
 *                                   description: Message content
 *                                   example: "Hello team!"
 *                                 message_type:
 *                                   type: string
 *                                   description: Type of message
 *                                   example: "TEXT"
 *                                 is_unsend:
 *                                   type: boolean
 *                                   description: Whether the message was unsent
 *                                   example: false
 *                                 user_id:
 *                                   type: string
 *                                   format: uuid
 *                                   description: ID of the message sender
 *                                   example: "user_id_789"
 *                       users:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: User ID
 *                             example: "user_id_123"
 *                           name:
 *                             type: string
 *                             description: User's name
 *                             example: "John Doe"
 *                           avatar:
 *                             type: string
 *                             description: URL to user's avatar
 *                             example: "https://example.com/avatar.jpg"
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
 *                   example: "Invalid user_id"
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
