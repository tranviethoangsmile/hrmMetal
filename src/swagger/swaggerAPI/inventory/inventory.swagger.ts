/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: API for managing product inventory
 */

/**
 * @swagger
 * /inventory/create:
 *   post:
 *     summary: Create new inventory
 *     tags: [Inventory]
 *     description: Create a new inventory record for a product in a department
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - quantity
 *               - department_id
 *             properties:
 *               product:
 *                 type: string
 *                 description: Name of the product
 *                 example: "Product A"
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product
 *                 example: 100
 *               department_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the department
 *                 example: "dept_id_123"
 *     responses:
 *       201:
 *         description: Inventory created successfully
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
 *                       description: ID of the created inventory record
 *                       example: "inventory_id_123"
 *                     product:
 *                       type: string
 *                       description: Product name
 *                       example: "Product A"
 *                     quantity:
 *                       type: integer
 *                       description: Product quantity
 *                       example: 100
 *                     department_id:
 *                       type: string
 *                       format: uuid
 *                       description: Department ID
 *                       example: "dept_id_123"
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
 *                   example: "Invalid input: Missing required product, quantity"
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
 *                   example: "Internal server error server error"
 */

/**
 * @swagger
 * /inventory/search:
 *   post:
 *     summary: Search inventory
 *     tags: [Inventory]
 *     description: Search inventory by product name or department
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product name to search for
 *                 example: "Product A"
 *               department_id:
 *                 type: string
 *                 format: uuid
 *                 description: Department ID to search for
 *                 example: "dept_id_123"
 *     responses:
 *       202:
 *         description: Inventory records found
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
 *                       product:
 *                         type: string
 *                         description: Product name
 *                         example: "Product A"
 *                       quantity:
 *                         type: integer
 *                         description: Product quantity
 *                         example: 100
 *                       department_id:
 *                         type: string
 *                         format: uuid
 *                         description: Department ID
 *                         example: "dept_id_123"
 *                       Department:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: Department name
 *                             example: "Production"
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
 *                   example: "Internal server error server error"
 */

/**
 * @swagger
 * /inventory/getall:
 *   post:
 *     summary: Get all inventory
 *     tags: [Inventory]
 *     description: Retrieve all inventory records with department details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: All inventory records retrieved successfully
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
 *                       product:
 *                         type: string
 *                         description: Product name
 *                         example: "Product A"
 *                       quantity:
 *                         type: integer
 *                         description: Product quantity
 *                         example: 100
 *                       department_id:
 *                         type: string
 *                         format: uuid
 *                         description: Department ID
 *                         example: "dept_id_123"
 *                       Department:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: Department name
 *                             example: "Production"
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
 *                   example: "Internal server error server error"
 */

/**
 * @swagger
 * /inventory/update:
 *   post:
 *     summary: Update inventory
 *     tags: [Inventory]
 *     description: Update quantity of a product in a department's inventory
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - quantity
 *               - department_id
 *             properties:
 *               product:
 *                 type: string
 *                 description: Name of the product to update
 *                 example: "Product A"
 *               quantity:
 *                 type: integer
 *                 description: New quantity of the product
 *                 example: 150
 *               department_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the department
 *                 example: "dept_id_123"
 *     responses:
 *       202:
 *         description: Inventory updated successfully
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
 *                   example: "Internal server error server error"
 */
