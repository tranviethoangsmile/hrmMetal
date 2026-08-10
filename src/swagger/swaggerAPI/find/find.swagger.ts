/**
 * @swagger
 * tags:
 *   name: Find
 *   description: Search endpoints for users and orders
 */

/**
 * @swagger
 * /api/version/v1/find/{name}:
 *   get:
 *     summary: Find users by name
 *     tags: [Find]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: User name to search for
 *     responses:
 *       200:
 *         description: Users retrieved successfully
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
 *                     $ref: '#/components/schemas/UserItem'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/find:
 *   post:
 *     summary: Search orders by field
 *     tags: [Find]
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
 *               created_at:
 *                 type: string
 *                 format: date-time
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
