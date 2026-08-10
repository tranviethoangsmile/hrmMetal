/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing food orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderUserSummary:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         employee_id:
 *           type: integer
 *         department:
 *           type: object
 *           nullable: true
 *           properties:
 *             name:
 *               type: string
 *     OrderItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date
 *         dayOrNight:
 *           type: string
 *         user_id:
 *           type: string
 *           format: uuid
 *         position:
 *           type: string
 *         isConfirmed:
 *           type: boolean
 *         isPicked:
 *           type: boolean
 *         user:
 *           $ref: '#/components/schemas/OrderUserSummary'
 */

/**
 * @swagger
 * /api/version/v1/order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
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
 *                 example: "user_id_123"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-03-20"
 *               dayOrNight:
 *                 type: string
 *                 enum: [DAY, NIGHT]
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
 *                   $ref: '#/components/schemas/OrderItem'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
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
 *                     $ref: '#/components/schemas/OrderItem'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/order/user:
 *   post:
 *     summary: Get orders for the current user
 *     tags: [Orders]
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
 *                     $ref: '#/components/schemas/OrderItem'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 *
 *   put:
 *     summary: Mark a user order as picked
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - user_id
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-03-20"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "user_id_123"
 *     responses:
 *       202:
 *         description: Order updated successfully
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
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/order/searchorderwithfield:
 *   post:
 *     summary: Search orders by field
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               date:
 *                 type: string
 *                 format: date
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               position:
 *                 type: string
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
 *                     $ref: '#/components/schemas/OrderItem'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/order/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Order ID
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
 *       500:
 *         description: Server error
 */
