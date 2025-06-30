/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API for managing notifications
 */

/**
 * @swagger
 * /notification/create:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     description: Create a new notification for a user
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
 *               - type
 *               - title
 *               - message
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user to receive the notification
 *                 example: "user_id_123"
 *               type:
 *                 type: string
 *                 enum: [EVENT, OVERTIME, SAFETY_CHECK, PAID_LEAVE, UNIFORM_ORDER]
 *                 description: Type of notification
 *                 example: "EVENT"
 *               title:
 *                 type: string
 *                 description: Title of the notification
 *                 example: "New Event"
 *               message:
 *                 type: string
 *                 description: Content of the notification
 *                 example: "You have been invited to a new event"
 *     responses:
 *       201:
 *         description: Notification created successfully
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
 *                       description: ID of the created notification
 *                       example: "notification_id_123"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the recipient
 *                       example: "user_id_123"
 *                     type:
 *                       type: string
 *                       description: Type of notification
 *                       example: "EVENT"
 *                     title:
 *                       type: string
 *                       description: Title of the notification
 *                       example: "New Event"
 *                     message:
 *                       type: string
 *                       description: Content of the notification
 *                       example: "You have been invited to a new event"
 *                     is_readed:
 *                       type: boolean
 *                       description: Whether the notification has been read
 *                       example: false
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
 *                   example: "Missing required message, title, type, user_id"
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
 * /notification/search:
 *   post:
 *     summary: Get notification by ID
 *     tags: [Notifications]
 *     description: Retrieve a specific notification by its ID
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
 *                 description: ID of the notification
 *                 example: "notification_id_123"
 *     responses:
 *       202:
 *         description: Notification retrieved successfully
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
 *                     type:
 *                       type: string
 *                       description: Type of notification
 *                       example: "EVENT"
 *                     title:
 *                       type: string
 *                       description: Title of the notification
 *                       example: "New Event"
 *                     message:
 *                       type: string
 *                       description: Content of the notification
 *                       example: "You have been invited to a new event"
 *                     is_readed:
 *                       type: boolean
 *                       description: Whether the notification has been read
 *                       example: false
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: When the notification was created
 *                       example: "2024-03-20T09:00:00Z"
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
 *                   example: "server error: Internal server error"
 */

/**
 * @swagger
 * /notification/searchbyuserid:
 *   post:
 *     summary: Get user's notifications
 *     tags: [Notifications]
 *     description: Retrieve all unread notifications for a specific user
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
 *         description: Notifications retrieved successfully
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
 *                         description: ID of the notification
 *                         example: "notification_id_123"
 *                       type:
 *                         type: string
 *                         description: Type of notification
 *                         example: "EVENT"
 *                       title:
 *                         type: string
 *                         description: Title of the notification
 *                         example: "New Event"
 *                       message:
 *                         type: string
 *                         description: Content of the notification
 *                         example: "You have been invited to a new event"
 *                       is_readed:
 *                         type: boolean
 *                         description: Whether the notification has been read
 *                         example: false
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: When the notification was created
 *                         example: "2024-03-20T09:00:00Z"
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
 *                   example: "server error: Internal server error"
 */

/**
 * @swagger
 * /notification/update:
 *   put:
 *     summary: Mark notification as read
 *     tags: [Notifications]
 *     description: Mark a notification as read
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
 *                 description: ID of the notification
 *                 example: "notification_id_123"
 *     responses:
 *       202:
 *         description: Notification marked as read successfully
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
 *                   example: "Bad request"
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
 * /notification/destroy:
 *   post:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     description: Delete a specific notification
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
 *                 description: ID of the notification to delete
 *                 example: "notification_id_123"
 *     responses:
 *       202:
 *         description: Notification deleted successfully
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
 *                   example: "Notification deleted successfully"
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
 *                   example: "Bad request"
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
 *                   example: "server Error: Internal server error"
 */
