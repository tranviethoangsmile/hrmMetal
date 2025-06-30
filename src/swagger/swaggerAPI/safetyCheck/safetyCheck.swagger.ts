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
 *                 description: ID of the user submitting the safety check
 *                 example: "b3b7c7e2-8c2e-4e2a-9c2e-4e2a9c2e4e2a"
 *               event_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the safety check event
 *                 example: "event_id_123"
 *               is_safety:
 *                 type: boolean
 *                 description: Whether the user is safe
 *                 example: true
 *               is_at_home:
 *                 type: boolean
 *                 description: Whether the user is at home
 *                 example: false
 *               is_can_work:
 *                 type: boolean
 *                 description: Whether the user can work
 *                 example: true
 *               feedback:
 *                 type: string
 *                 description: Additional feedback or comments from the user
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
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the created safety check
 *                       example: "check_id_123"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the user who submitted the check
 *                       example: "b3b7c7e2-8c2e-4e2a-9c2e-4e2a9c2e4e2a"
 *                     event_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the safety check event
 *                       example: "event_id_123"
 *                     is_safety:
 *                       type: boolean
 *                       description: Whether the user is safe
 *                       example: true
 *                     is_at_home:
 *                       type: boolean
 *                       description: Whether the user is at home
 *                       example: false
 *                     is_can_work:
 *                       type: boolean
 *                       description: Whether the user can work
 *                       example: true
 *                     feedback:
 *                       type: string
 *                       description: Additional feedback or comments from the user
 *                       example: "Tôi vẫn khỏe, có thể đi làm."
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: When the safety check was created
 *                       example: "2024-03-20T10:30:00Z"
 *                 message:
 *                   type: string
 *                   example: "Safety check created successfully"
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
 *                   example: "Internal server error"
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
 *                 description: ID of the user to search for
 *                 example: "b3b7c7e2-8c2e-4e2a-9c2e-4e2a9c2e4e2a"
 *               event_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the event to search in
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
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the safety check
 *                       example: "check_id_123"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the user
 *                       example: "b3b7c7e2-8c2e-4e2a-9c2e-4e2a9c2e4e2a"
 *                     event_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the event
 *                       example: "event_id_123"
 *                     is_safety:
 *                       type: boolean
 *                       description: Whether the user is safe
 *                       example: true
 *                     is_at_home:
 *                       type: boolean
 *                       description: Whether the user is at home
 *                       example: false
 *                     is_can_work:
 *                       type: boolean
 *                       description: Whether the user can work
 *                       example: true
 *                     feedback:
 *                       type: string
 *                       description: Additional feedback or comments from the user
 *                       example: "Tôi vẫn khỏe, có thể đi làm."
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: When the safety check was created
 *                       example: "2024-03-20T10:30:00Z"
 *                 message:
 *                   type: string
 *                   example: "Safety check found"
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
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /safetyCheck/getallusercheckedsafetycheckevent:
 *   post:
 *     summary: Get all users who have completed safety check for an event
 *     tags: [SafetyChecks]
 *     description: Retrieve a list of all users who have completed safety check for a specific event.
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
 *                 description: The ID of the event
 *                 example: "event_id_123"
 *     responses:
 *       202:
 *         description: Successfully retrieved list of users
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
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         description: ID of the user who completed the check
 *                         example: "user_id_123"
 *                       employee_id:
 *                         type: string
 *                         description: Employee ID of the user
 *                         example: "EMP001"
 *                       avatar:
 *                         type: string
 *                         description: URL of the user's avatar
 *                         example: "https://example.com/avatar.jpg"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: When the safety check was completed
 *                         example: "2024-03-20T10:30:00Z"
 *                       user:
 *                         type: object
 *                         description: Detailed user information
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: ID of the user
 *                             example: "user_id_123"
 *                           name:
 *                             type: string
 *                             description: Name of the user
 *                             example: "Nguyễn Văn A"
 *                           department:
 *                             type: object
 *                             description: User's department information
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 format: uuid
 *                                 description: ID of the department
 *                                 example: "dept_id_123"
 *                               name:
 *                                 type: string
 *                                 description: Name of the department
 *                                 example: "Phòng Kỹ Thuật"
 *       400:
 *         description: Bad request - ID is required
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
 *                   example: "server: Internal server error"
 */
