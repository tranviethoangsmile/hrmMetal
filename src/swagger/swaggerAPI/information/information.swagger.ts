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
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user
 *                 example: "user123"
 *               details:
 *                 type: string
 *                 description: Details of the information
 *                 example: "User's personal information"
 *     responses:
 *       201:
 *         description: Information created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /information/getinforofuser:
 *   get:
 *     summary: Get information of a user
 *     tags: [Information]
 *     description: Retrieve information of a specific user by their ID.
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
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
 *                   type: object
 *                   description: User information
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /information/getinforbyid:
 *   get:
 *     summary: Get information by ID
 *     tags: [Information]
 *     description: Retrieve specific information by its ID.
 *     parameters:
 *       - in: query
 *         name: information_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the information
 *     responses:
 *       200:
 *         description: Information retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /information/getallinforbyfield:
 *   get:
 *     summary: Get all information by field
 *     tags: [Information]
 *     description: Retrieve all information based on specific fields.
 *     parameters:
 *       - in: query
 *         name: field
 *         schema:
 *           type: string
 *         description: Field to filter information
 *     responses:
 *       200:
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
 *                     properties:
 *                       information_id:
 *                         type: string
 *                         description: ID of the information
 *                       details:
 *                         type: string
 *                         description: Details of the information
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /information/deleteinformationbyid:
 *   delete:
 *     summary: Delete information by ID
 *     tags: [Information]
 *     description: Delete specific information by its ID.
 *     parameters:
 *       - in: query
 *         name: information_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the information to delete
 *     responses:
 *       200:
 *         description: Information deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
