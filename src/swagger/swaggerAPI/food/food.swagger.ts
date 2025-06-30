/**
 * @swagger
 * tags:
 *   name: Food
 *   description: API for managing food items
 */

/**
 * @swagger
 * /food:
 *   post:
 *     summary: Create a new food item
 *     tags: [Food]
 *     description: Create a new food item with name, description and price
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the food item
 *                 example: "Phở bò"
 *               description:
 *                 type: string
 *                 description: Description of the food item
 *                 example: "Phở bò tái nạm gầu"
 *               price:
 *                 type: number
 *                 description: Price of the food item
 *                 example: 50000
 *     responses:
 *       201:
 *         description: Food item created successfully
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
 *                       description: ID of the created food item
 *                       example: "food_id_123"
 *                     name:
 *                       type: string
 *                       description: Name of the food item
 *                       example: "Phở bò"
 *                     description:
 *                       type: string
 *                       description: Description of the food item
 *                       example: "Phở bò tái nạm gầu"
 *                     price:
 *                       type: number
 *                       description: Price of the food item
 *                       example: 50000
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: When the food item was created
 *                       example: "2024-03-20T10:30:00Z"
 *                 message:
 *                   type: string
 *                   example: "Food item created successfully"
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
 * /food/{id}:
 *   get:
 *     summary: Get a food item by ID
 *     tags: [Food]
 *     description: Retrieve a food item by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the food item to retrieve
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Food item retrieved successfully
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
 *                       description: ID of the food item
 *                       example: "food_id_123"
 *                     name:
 *                       type: string
 *                       description: Name of the food item
 *                       example: "Phở bò"
 *                     description:
 *                       type: string
 *                       description: Description of the food item
 *                       example: "Phở bò tái nạm gầu"
 *                     price:
 *                       type: number
 *                       description: Price of the food item
 *                       example: 50000
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: When the food item was created
 *                       example: "2024-03-20T10:30:00Z"
 *       404:
 *         description: Food item not found
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
 *                   example: "Food item not found"
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
 * /food:
 *   get:
 *     summary: Get all food items
 *     tags: [Food]
 *     description: Retrieve a list of all food items
 *     responses:
 *       200:
 *         description: Food items retrieved successfully
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
 *                         description: ID of the food item
 *                         example: "food_id_123"
 *                       name:
 *                         type: string
 *                         description: Name of the food item
 *                         example: "Phở bò"
 *                       description:
 *                         type: string
 *                         description: Description of the food item
 *                         example: "Phở bò tái nạm gầu"
 *                       price:
 *                         type: number
 *                         description: Price of the food item
 *                         example: 50000
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: When the food item was created
 *                         example: "2024-03-20T10:30:00Z"
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
