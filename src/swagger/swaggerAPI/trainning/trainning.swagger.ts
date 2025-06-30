/**
 * @swagger
 * tags:
 *   name: Training
 *   description: API for managing training materials
 */

/**
 * @swagger
 * /trainning:
 *   post:
 *     summary: Create a new training material
 *     tags: [Training]
 *     description: Create a new training material with media files
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - trainning_name
 *               - product_name
 *               - description
 *               - user_id
 *               - media
 *             properties:
 *               trainning_name:
 *                 type: string
 *                 description: Name of the training material
 *                 example: "Assembly Process Training"
 *               product_name:
 *                 type: string
 *                 description: Name of the product this training is for
 *                 example: "Product A"
 *               description:
 *                 type: string
 *                 description: Detailed description of the training
 *                 example: "Step by step guide for assembling Product A"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user creating the training
 *                 example: "user_id_123"
 *               media:
 *                 type: array
 *                 description: Array of media files (images, videos, documents)
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Training material created successfully
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
 *                       description: ID of the created training
 *                       example: "training_id_123"
 *                     trainning_name:
 *                       type: string
 *                       description: Name of the training material
 *                       example: "Assembly Process Training"
 *                     product_name:
 *                       type: string
 *                       description: Name of the product
 *                       example: "Product A"
 *                     description:
 *                       type: string
 *                       description: Detailed description
 *                       example: "Step by step guide for assembling Product A"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the creator
 *                       example: "user_id_123"
 *                     media_urls:
 *                       type: array
 *                       description: URLs of uploaded media files
 *                       items:
 *                         type: string
 *                         example: "https://example.com/media/image1.jpg"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: When the training was created
 *                       example: "2024-03-20T10:30:00Z"
 *                 message:
 *                   type: string
 *                   example: "Training material created successfully"
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
 *
 *   get:
 *     summary: Get all training materials
 *     tags: [Training]
 *     description: Retrieve a list of all training materials
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Training materials retrieved successfully
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
 *                         description: ID of the training
 *                         example: "training_id_123"
 *                       trainning_name:
 *                         type: string
 *                         description: Name of the training material
 *                         example: "Assembly Process Training"
 *                       product_name:
 *                         type: string
 *                         description: Name of the product
 *                         example: "Product A"
 *                       description:
 *                         type: string
 *                         description: Detailed description
 *                         example: "Step by step guide for assembling Product A"
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         description: ID of the creator
 *                         example: "user_id_123"
 *                       media_urls:
 *                         type: array
 *                         description: URLs of media files
 *                         items:
 *                           type: string
 *                           example: "https://example.com/media/image1.jpg"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: When the training was created
 *                         example: "2024-03-20T10:30:00Z"
 *                       user:
 *                         type: object
 *                         description: Information about the creator
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: ID of the user
 *                             example: "user_id_123"
 *                           name:
 *                             type: string
 *                             description: Name of the user
 *                             example: "John Doe"
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
 *                                 example: "Training"
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
 * /trainning/search/{product_name}:
 *   get:
 *     summary: Search training materials by product name
 *     tags: [Training]
 *     description: Retrieve training materials for a specific product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_name
 *         required: true
 *         description: Name of the product to search training materials for
 *         schema:
 *           type: string
 *           example: "Product A"
 *     responses:
 *       200:
 *         description: Training materials found successfully
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
 *                         description: ID of the training
 *                         example: "training_id_123"
 *                       trainning_name:
 *                         type: string
 *                         description: Name of the training material
 *                         example: "Assembly Process Training"
 *                       product_name:
 *                         type: string
 *                         description: Name of the product
 *                         example: "Product A"
 *                       description:
 *                         type: string
 *                         description: Detailed description
 *                         example: "Step by step guide for assembling Product A"
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         description: ID of the creator
 *                         example: "user_id_123"
 *                       media_urls:
 *                         type: array
 *                         description: URLs of media files
 *                         items:
 *                           type: string
 *                           example: "https://example.com/media/image1.jpg"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: When the training was created
 *                         example: "2024-03-20T10:30:00Z"
 *                       user:
 *                         type: object
 *                         description: Information about the creator
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: ID of the user
 *                             example: "user_id_123"
 *                           name:
 *                             type: string
 *                             description: Name of the user
 *                             example: "John Doe"
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
 *                                 example: "Training"
 *       404:
 *         description: No training materials found
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
 *                   example: "No training materials found for this product"
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
