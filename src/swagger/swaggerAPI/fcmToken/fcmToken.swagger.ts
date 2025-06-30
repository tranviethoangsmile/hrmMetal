/**
 * @swagger
 * tags:
 *   name: FCM Tokens
 *   description: API for managing Firebase Cloud Messaging (FCM) tokens
 */

/**
 * @swagger
 * /fcmtoken/create:
 *   post:
 *     summary: Create or update FCM token
 *     tags: [FCM Tokens]
 *     description: Create a new FCM token or update existing one for a user's device
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
 *               - fcm_token
 *               - device_type
 *               - app_version
 *               - device_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user
 *                 example: "user_id_123"
 *               fcm_token:
 *                 type: string
 *                 description: Firebase Cloud Messaging token
 *                 example: "fMEz7-F_Qk2Jo0Rxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 *               device_type:
 *                 type: string
 *                 enum: [ANDROID, IOS, WEB]
 *                 description: Type of device
 *                 example: "ANDROID"
 *               app_version:
 *                 type: string
 *                 description: Version of the application
 *                 example: "1.0.0"
 *               device_id:
 *                 type: string
 *                 description: Unique identifier of the device
 *                 example: "device_id_123"
 *     responses:
 *       201:
 *         description: FCM token created/updated successfully
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
 *                   example: "Missing required fields: app_version, device_id"
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
