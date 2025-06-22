/**
 * @swagger
 * tags:
 *   name: SafetyChecks
 *   description: API for managing safety checks
 */

/**
 * @swagger
 * /safetyCheck/create:
 *   post:
 *     summary: Create a new safety check
 *     tags: [SafetyChecks]
 *     description: Endpoint to create a new safety check.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - event_id
 *               - is_safety
 *               - is_at_home
 *               - is_can_work
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "b3b7c7e2-8c2e-4e2a-9c2e-4e2a9c2e4e2a"
 *               event_id:
 *                 type: string
 *                 format: uuid
 *                 example: "event_id_123"
 *               is_safety:
 *                 type: boolean
 *                 example: true
 *               is_at_home:
 *                 type: boolean
 *                 example: false
 *               is_can_work:
 *                 type: boolean
 *                 example: true
 *               feedback:
 *                 type: string
 *                 example: "Tôi vẫn khỏe, có thể đi làm."
 *     responses:
 *       201:
 *         description: Safety check created successfully
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
 *                 message:
 *                   type: string
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
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /safetyCheck/searchsafetychecked:
 *   post:
 *     summary: Search completed safety check of user for event
 *     tags: [SafetyChecks]
 *     description: Retrieve a completed safety check by user and event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - event_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "b3b7c7e2-8c2e-4e2a-9c2e-4e2a9c2e4e2a"
 *               event_id:
 *                 type: string
 *                 format: uuid
 *                 example: "event_id_123"
 *     responses:
 *       201:
 *         description: Safety check found successfully
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
 *                 message:
 *                   type: string
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
 *       500:
 *         description: Server error
 */
