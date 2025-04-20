/**
 * @swagger
 * tags:
 *   name: Canteens
 *   description: API for managing canteen data
 */

/**
 * @swagger
 * /canteen:
 *   post:
 *     summary: Create a new canteen
 *     tags: [Canteens]
 *     description: Endpoint to create a new canteen record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the canteen
 *                 example: "Main Canteen"
 *               location:
 *                 type: string
 *                 description: Location of the canteen
 *                 example: "Building A, Floor 1"
 *               capacity:
 *                 type: number
 *                 description: Maximum capacity of the canteen
 *                 example: 100
 *     responses:
 *       201:
 *         description: Canteen created successfully
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
 *                   description: Details of the created canteen
 *       400:
 *         description: Bad request (e.g., missing or invalid data)
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
 *                   example: "server error: <error message>"
 */

/**
 * @swagger
 * /canteen/{id}:
 *   get:
 *     summary: Get a canteen by ID
 *     tags: [Canteens]
 *     description: Retrieve details of a specific canteen by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the canteen
 *         example: "canteen123"
 *     responses:
 *       201:
 *         description: Canteen details retrieved successfully
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
 *                   description: Details of the canteen
 *       400:
 *         description: Bad request (e.g., missing or invalid ID)
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
 *                   example: "server error: <error message>"
 */

/**
 * @swagger
 * /canteen:
 *   get:
 *     summary: Get all canteens
 *     tags: [Canteens]
 *     description: Retrieve a list of all canteens.
 *     responses:
 *       201:
 *         description: List of canteens retrieved successfully
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
 *                         description: ID of the canteen
 *                       name:
 *                         type: string
 *                         description: Name of the canteen
 *                       location:
 *                         type: string
 *                         description: Location of the canteen
 *                       capacity:
 *                         type: number
 *                         description: Maximum capacity of the canteen
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
 *                   example: "server error: <error message>"
 */
