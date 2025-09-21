/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API for managing products
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     description: Create a new product with user information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - ic_card
 *               - shift
 *               - date
 *               - quantity
 *               - day_code
 *               - user_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product (must be one of the predefined product names)
 *                 example: "Product A"
 *               ic_card:
 *                 type: string
 *                 description: IC card number of the user
 *                 example: "IC001"
 *               shift:
 *                 type: string
 *                 description: Work shift (e.g., morning, afternoon, night)
 *                 example: "morning"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of production
 *                 example: "2024-03-20"
 *               quantity:
 *                 type: number
 *                 description: Quantity of products produced
 *                 example: 100
 *               day_code:
 *                 type: string
 *                 description: Code for the production day
 *                 example: "D001"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user creating the product
 *                 example: "user_id_123"
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *                       description: ID of the created product
 *                       example: "product_id_123"
 *                     name:
 *                       type: string
 *                       description: Name of the product
 *                       example: "Product A"
 *                     ic_card:
 *                       type: string
 *                       description: IC card number of the user
 *                       example: "IC001"
 *                     shift:
 *                       type: string
 *                       description: Work shift
 *                       example: "morning"
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Date of production
 *                       example: "2024-03-20"
 *                     quantity:
 *                       type: number
 *                       description: Quantity of products produced
 *                       example: 100
 *                     day_code:
 *                       type: string
 *                       description: Code for the production day
 *                       example: "D001"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the user who created the product
 *                       example: "user_id_123"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: When the product was created
 *                       example: "2024-03-20T10:30:00Z"
 *                 message:
 *                   type: string
 *                   example: "Product created successfully"
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
 * /product/search:
 *   post:
 *     summary: Search for products
 *     tags: [Product]
 *     description: Search for products based on various criteria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product to search for
 *                 example: "Product A"
 *               ic_card:
 *                 type: string
 *                 description: IC card number to search for
 *                 example: "IC001"
 *               shift:
 *                 type: string
 *                 description: Work shift to search for
 *                 example: "morning"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date to search for
 *                 example: "2024-03-20"
 *               day_code:
 *                 type: string
 *                 description: Day code to search for
 *                 example: "D001"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: User ID to search for
 *                 example: "user_id_123"
 *     responses:
 *       200:
 *         description: Products retrieved successfully
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
 *                         description: ID of the product
 *                         example: "product_id_123"
 *                       name:
 *                         type: string
 *                         description: Name of the product
 *                         example: "Product A"
 *                       ic_card:
 *                         type: string
 *                         description: IC card number of the user
 *                         example: "IC001"
 *                       shift:
 *                         type: string
 *                         description: Work shift
 *                         example: "morning"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date of production
 *                         example: "2024-03-20"
 *                       quantity:
 *                         type: number
 *                         description: Quantity of products produced
 *                         example: 100
 *                       day_code:
 *                         type: string
 *                         description: Code for the production day
 *                         example: "D001"
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         description: ID of the user who created the product
 *                         example: "user_id_123"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: When the product was created
 *                         example: "2024-03-20T10:30:00Z"
 *                       user:
 *                         type: object
 *                         description: Information about the user who created the product
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
 *                                 example: "Production"
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
 *                   example: "Invalid search criteria"
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
