/**
 * @swagger
 * tags:
 *   name: UniformOrders
 *   description: API for managing uniform orders
 */

/**
 * @swagger
 * /uniformOrder/create:
 *   post:
 *     summary: Create a new uniform order
 *     tags: [UniformOrders]
 *     description: Endpoint to create a new uniform order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user placing the order
 *                 example: "user123"
 *               position:
 *                 type: string
 *                 description: Position of the user
 *                 example: "Manager"
 *               uniform_details:
 *                 type: array
 *                 description: Details of the uniform order
 *                 items:
 *                   type: object
 *                   properties:
 *                     item_id:
 *                       type: string
 *                       description: ID of the uniform item
 *                     quantity:
 *                       type: number
 *                       description: Quantity of the item
 *     responses:
 *       201:
 *         description: Uniform order created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /uniformOrder/search:
 *   get:
 *     summary: Search uniform orders
 *     tags: [UniformOrders]
 *     description: Search uniform orders by position or user ID.
 *     parameters:
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         description: Position to filter uniform orders
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: User ID to filter uniform orders
 *     responses:
 *       200:
 *         description: List of uniform orders
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /uniformOrder/delete:
 *   delete:
 *     summary: Delete a uniform order
 *     tags: [UniformOrders]
 *     description: Delete a uniform order by its ID.
 *     parameters:
 *       - in: query
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the uniform order to delete
 *     responses:
 *       200:
 *         description: Uniform order deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /uniformOrder/getuniformorderdetail:
 *   get:
 *     summary: Get uniform order details
 *     tags: [UniformOrders]
 *     description: Retrieve details of a specific uniform order by its ID.
 *     parameters:
 *       - in: query
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the uniform order
 *     responses:
 *       200:
 *         description: Uniform order details retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /uniformOrder/update:
 *   put:
 *     summary: Update a uniform order
 *     tags: [UniformOrders]
 *     description: Update details of an existing uniform order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *                 description: ID of the uniform order to update
 *                 example: "order123"
 *               uniform_details:
 *                 type: array
 *                 description: Updated details of the uniform order
 *                 items:
 *                   type: object
 *                   properties:
 *                     item_id:
 *                       type: string
 *                       description: ID of the uniform item
 *                     quantity:
 *                       type: number
 *                       description: Updated quantity of the item
 *     responses:
 *       200:
 *         description: Uniform order updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
