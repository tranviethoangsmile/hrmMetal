/**
 * @swagger
 * tags:
 *   name: Information
 *   description: API for managing information posts
 */

/**
 * @swagger
 * /api/version/v1/information/getinforofuser:
 *   post:
 *     summary: Get information by user ID
 *     tags: [Information]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve information posts that belong to a specific user. Requires a valid JWT and one of the allowed roles.
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
 *                 example: "b3b7c7e2-8c2e-4e2a-9c2e-4e2a9c2e4e2a"
 *     responses:
 *       200:
 *         description: Information retrieved successfully
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
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       media:
 *                         type: string
 *                         nullable: true
 *                       position:
 *                         type: string
 *                       is_public:
 *                         type: boolean
 *                       is_video:
 *                         type: boolean
 *                       is_event:
 *                         type: boolean
 *                       User:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           name:
 *                             type: string
 *                           role:
 *                             type: string
 *                           avatar:
 *                             type: string
 *                           department:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
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
 *       401:
 *         description: Authentication token is required or invalid
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
 *       403:
 *         description: You do not have permission for this action
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
 */

/**
 * @swagger
 * /api/version/v1/information/getinforbyid:
 *   post:
 *     summary: Get information by ID
 *     tags: [Information]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a single information post by its ID.
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
 *                 example: "b3b7c7e2-8c2e-4e2a-9c2e-4e2a9c2e4e2a"
 *     responses:
 *       200:
 *         description: Information retrieved successfully
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
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date-time
 *                     media:
 *                       type: string
 *                       nullable: true
 *                     position:
 *                       type: string
 *                     is_public:
 *                       type: boolean
 *                     is_video:
 *                       type: boolean
 *                     is_event:
 *                       type: boolean
 *                     User:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                         name:
 *                           type: string
 *                         role:
 *                           type: string
 *                         avatar:
 *                           type: string
 *                         department:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
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
 *       401:
 *         description: Authentication token is required or invalid
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
 *       403:
 *         description: You do not have permission for this action
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
 *       404:
 *         description: Information not found
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
 */

/**
 * @swagger
 * /api/version/v1/information/getallinforbyfield:
 *   post:
 *     summary: Get information by current user position
 *     tags: [Information]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve up to 10 public information posts that match the authenticated user's position. The position is read from the JWT payload, so no request body is required.
 *     responses:
 *       200:
 *         description: Information retrieved successfully
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
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       media:
 *                         type: string
 *                         nullable: true
 *                       position:
 *                         type: string
 *                       is_public:
 *                         type: boolean
 *                       is_video:
 *                         type: boolean
 *                       is_event:
 *                         type: boolean
 *                       User:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           name:
 *                             type: string
 *                           role:
 *                             type: string
 *                           avatar:
 *                             type: string
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
 *       401:
 *         description: Authentication token is required or invalid
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
 *       403:
 *         description: You do not have permission for this action
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
 */
