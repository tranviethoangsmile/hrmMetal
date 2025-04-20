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
 *     description: Endpoint to create a new notification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the notification
 *                 example: "System Update"
 *               message:
 *                 type: string
 *                 description: Message content of the notification
 *                 example: "The system will undergo maintenance at midnight."
 *               user_id:
 *                 type: string
 *                 description: ID of the user to receive the notification
 *                 example: "user123"
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /notification/update:
 *   put:
 *     summary: Update an existing notification
 *     tags: [Notifications]
 *     description: Update details of an existing notification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notification_id:
 *                 type: string
 *                 description: ID of the notification to update
 *                 example: "notif123"
 *               title:
 *                 type: string
 *                 description: Updated title of the notification
 *                 example: "Updated System Update"
 *               message:
 *                 type: string
 *                 description: Updated message content
 *                 example: "The maintenance has been rescheduled to 2 AM."
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /notification/destroy:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     description: Delete a notification by its ID.
 *     parameters:
 *       - in: query
 *         name: notification_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the notification to delete
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /notification/search:
 *   get:
 *     summary: Search notifications
 *     tags: [Notifications]
 *     description: Retrieve a list of notifications based on filters.
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Title to filter notifications
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: User ID to filter notifications
 *     responses:
 *       200:
 *         description: List of notifications retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /notification/searchById:
 *   get:
 *     summary: Search notifications by user ID
 *     tags: [Notifications]
 *     description: Retrieve notifications for a specific user by their ID.
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to retrieve notifications for
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
