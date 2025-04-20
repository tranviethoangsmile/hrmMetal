/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     description: Endpoint to create a new order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                type: string
 *               user_id:
 *                 type: string
 *                 description: ID of the user placing the order
 *                 example: "c13r-cdsdf-đsad"
 *               dayOrNight:
 *                type: string
 *                example: "DAY"
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request (e.g., missing data)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     description: Retrieve a list of all orders.
 *     responses:
 *       202:
 *         description: List of orders retrieved successfully
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
 *                       order_id:
 *                         type: string
 *                         description: ID of the order
 *                       product_id:
 *                         type: string
 *                         description: ID of the product
 *                       quantity:
 *                         type: number
 *                         description: Quantity of the product
 *                       user_id:
 *                         type: string
 *                         description: ID of the user
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     description: Delete a specific order by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to delete
 *     responses:
 *       202:
 *         description: Order deleted successfully
 *       400:
 *         description: Bad request (e.g., missing ID)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /order/user:
 *   get:
 *     summary: User-specific order operations
 *     tags: [Orders]
 *     description: Placeholder for user-specific order operations.
 *     responses:
 *       200:
 *         description: User-specific order operations endpoint
 */

/**
 * @swagger
 * /order/searchorderwithfield:
 *   get:
 *     summary: Search orders with specific fields
 *     tags: [Orders]
 *     description: Retrieve orders based on specific fields.
 *     parameters:
 *       - in: query
 *         name: field
 *         schema:
 *           type: string
 *         description: Field to filter orders
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
