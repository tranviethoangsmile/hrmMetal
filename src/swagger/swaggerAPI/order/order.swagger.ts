/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing food orders
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     description: Create a new food order for a user
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
 *               - date
 *               - dayOrNight
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user placing the order
 *                 example: "user_id_123"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the order
 *                 example: "2024-03-20"
 *               dayOrNight:
 *                 type: string
 *                 enum: [DAY, NIGHT]
 *                 description: Whether the order is for day or night shift
 *                 example: "DAY"
 *     responses:
 *       201:
 *         description: Order created successfully
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
 *                       description: ID of the created order
 *                       example: "order_id_123"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the user who placed the order
 *                       example: "user_id_123"
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Date of the order
 *                       example: "2024-03-20"
 *                     dayOrNight:
 *                       type: string
 *                       description: Whether the order is for day or night shift
 *                       example: "DAY"
 *                     isPicked:
 *                       type: boolean
 *                       description: Whether the order has been picked up
 *                       example: false
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
 *                   example: "data not empty"
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
 *                   example: "server error: Internal server error"
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     description: Retrieve a list of all food orders with user and department details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Orders retrieved successfully
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
 *                         description: Order ID
 *                         example: "order_id_123"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date of the order
 *                         example: "2024-03-20"
 *                       dayOrNight:
 *                         type: string
 *                         description: Whether the order is for day or night shift
 *                         example: "DAY"
 *                       isPicked:
 *                         type: boolean
 *                         description: Whether the order has been picked up
 *                         example: false
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: User ID
 *                             example: "user_id_123"
 *                           name:
 *                             type: string
 *                             description: User's name
 *                             example: "John Doe"
 *                           employee_id:
 *                             type: string
 *                             description: Employee ID
 *                             example: "EMP123"
 *                           department:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 description: Department name
 *                                 example: "Engineering"
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
 *                   example: "server error: Internal server error"
 */

/**
 * @swagger
 * /order/search:
 *   post:
 *     summary: Search orders
 *     tags: [Orders]
 *     description: Search orders by date and shift
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date to search for
 *                 example: "2024-03-20"
 *               dayOrNight:
 *                 type: string
 *                 enum: [DAY, NIGHT]
 *                 description: Shift to search for
 *                 example: "DAY"
 *     responses:
 *       202:
 *         description: Orders found successfully
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
 *                         description: Order ID
 *                         example: "order_id_123"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date of the order
 *                         example: "2024-03-20"
 *                       dayOrNight:
 *                         type: string
 *                         description: Whether the order is for day or night shift
 *                         example: "DAY"
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: User ID
 *                             example: "user_id_123"
 *                           name:
 *                             type: string
 *                             description: User's name
 *                             example: "John Doe"
 *                           employee_id:
 *                             type: string
 *                             description: Employee ID
 *                             example: "EMP123"
 *                           department:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 description: Department name
 *                                 example: "Engineering"
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
 *                   example: "Missing parameters data not empty"
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
 *                   example: "server error: Internal server error"
 */

/**
 * @swagger
 * /order/searchorderofuser:
 *   post:
 *     summary: Get user's orders for the month
 *     tags: [Orders]
 *     description: Retrieve all orders for a specific user in the current month
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
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user
 *                 example: "user_id_123"
 *     responses:
 *       202:
 *         description: Orders retrieved successfully
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
 *                         description: Order ID
 *                         example: "order_id_123"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date of the order
 *                         example: "2024-03-20"
 *                       dayOrNight:
 *                         type: string
 *                         description: Whether the order is for day or night shift
 *                         example: "DAY"
 *                       isPicked:
 *                         type: boolean
 *                         description: Whether the order has been picked up
 *                         example: false
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
 *                   example: "id not empty"
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
 *                   example: "server error: Internal server error"
 */

/**
 * @swagger
 * /order/checkinpicked:
 *   post:
 *     summary: Mark order as picked up
 *     tags: [Orders]
 *     description: Mark a user's order for a specific date as picked up
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
 *               - date
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user
 *                 example: "user_id_123"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the order
 *                 example: "2024-03-20"
 *     responses:
 *       202:
 *         description: Order marked as picked up successfully
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
 *                   example: "server error: Internal server error"
 */

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     description: Delete a specific order by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the order to delete
 *         example: "order_id_123"
 *     responses:
 *       202:
 *         description: Order deleted successfully
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
 *                   example: "Invalid order ID"
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
 *                   example: "server error: Internal server error"
 */
