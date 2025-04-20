/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: API for managing inventory
 */

/**
 * @swagger
 * /inventory/create:
 *   post:
 *     summary: Create a new inventory item
 *     tags: [Inventory]
 *     description: Endpoint to create a new inventory item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_name:
 *                 type: string
 *                 description: Name of the inventory item
 *                 example: "Steel Rod"
 *               quantity:
 *                 type: number
 *                 description: Quantity of the item
 *                 example: 100
 *               location:
 *                 type: string
 *                 description: Location of the item in the warehouse
 *                 example: "Aisle 3, Shelf B"
 *     responses:
 *       201:
 *         description: Inventory item created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /inventory/search:
 *   get:
 *     summary: Search inventory items
 *     tags: [Inventory]
 *     description: Retrieve a list of inventory items based on filters.
 *     parameters:
 *       - in: query
 *         name: item_name
 *         schema:
 *           type: string
 *         description: Name of the inventory item to search for
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Location of the inventory item
 *     responses:
 *       200:
 *         description: List of inventory items retrieved successfully
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
 *                       item_id:
 *                         type: string
 *                         description: ID of the inventory item
 *                       item_name:
 *                         type: string
 *                         description: Name of the inventory item
 *                       quantity:
 *                         type: number
 *                         description: Quantity of the item
 *                       location:
 *                         type: string
 *                         description: Location of the item
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /inventory/getall:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     description: Retrieve a list of all inventory items.
 *     responses:
 *       200:
 *         description: List of all inventory items retrieved successfully
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
 *                       item_id:
 *                         type: string
 *                         description: ID of the inventory item
 *                       item_name:
 *                         type: string
 *                         description: Name of the inventory item
 *                       quantity:
 *                         type: number
 *                         description: Quantity of the item
 *                       location:
 *                         type: string
 *                         description: Location of the item
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /inventory/update:
 *   put:
 *     summary: Update an inventory item
 *     tags: [Inventory]
 *     description: Update details of an existing inventory item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item_id:
 *                 type: string
 *                 description: ID of the inventory item to update
 *                 example: "item123"
 *               quantity:
 *                 type: number
 *                 description: Updated quantity of the item
 *                 example: 150
 *               location:
 *                 type: string
 *                 description: Updated location of the item
 *                 example: "Aisle 4, Shelf C"
 *     responses:
 *       200:
 *         description: Inventory item updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
