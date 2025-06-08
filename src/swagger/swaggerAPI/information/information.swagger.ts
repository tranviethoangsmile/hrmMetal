/**
 * @swagger
 * tags:
 *   name: Information
 *   description: API for managing user information
 */

/**
 * @swagger
 * /information/create:
 *   post:
 *     summary: Create new user information
 *     tags: [Information]
 *     description: Endpoint to create new user information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - title
 *               - content
 *               - date
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user
 *                 example: "b3b7c7e2-8c2e-4e2a-9c2e-4e2a9c2e4e2a"
 *               title:
 *                 type: string
 *                 example: "Thông báo mới"
 *               content:
 *                 type: string
 *                 example: "Nội dung thông báo"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-01T00:00:00.000Z"
 *               position:
 *                 type: string
 *                 example: "Nhân viên"
 *               media:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               is_video:
 *                 type: boolean
 *                 example: false
 *               is_public:
 *                 type: boolean
 *                 example: true
 *               is_event:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Information created successfully
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
 *       200:
 *         description: Create failed
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
 *
 */

/**
 * @swagger
 * /information/getinforofuser:
 *   post:
 *     summary: Get information of a user
 *     tags: [Information]
 *     description: Retrieve information of a specific user by their ID.
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
 *       202:
 *         description: User information retrieved successfully
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
 *                 message:
 *                   type: string
 *       200:
 *         description: Get failed
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
 * /information/getinforbyid:
 *   post:
 *     summary: Get information by ID
 *     tags: [Information]
 *     description: Retrieve specific information by its ID.
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
 *       202:
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
 *                 message:
 *                   type: string
 *       200:
 *         description: Get failed
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
 * /information/getallinforbyfield:
 *   post:
 *     summary: Get all information by field
 *     tags: [Information]
 *     description: Retrieve all information based on specific fields.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               position:
 *                 type: string
 *               media:
 *                 type: string
 *               is_video:
 *                 type: boolean
 *               is_public:
 *                 type: boolean
 *               is_check_safety:
 *                 type: boolean
 *     responses:
 *       202:
 *         description: List of information retrieved successfully
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
 *                 message:
 *                   type: string
 *       200:
 *         description: Get failed
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
 * /information/deleteinformationbyid:
 *   post:
 *     summary: Delete information by ID
 *     tags: [Information]
 *     description: Delete specific information by its ID.
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
 *       202:
 *         description: Information deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: Delete failed
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
