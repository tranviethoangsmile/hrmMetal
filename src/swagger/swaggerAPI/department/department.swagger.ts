/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: API for managing departments
 */

/**
 * @swagger
 * /department:
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     description: Retrieve a list of all departments.
 *     responses:
 *       202:
 *         description: List of departments retrieved successfully
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
 *                         description: ID of the department
 *                       name:
 *                         type: string
 *                         description: Name of the department
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /department:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     description: Endpoint to create a new department.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the department
 *                 example: "Human Resources"
 *               description:
 *                 type: string
 *                 description: Description of the department
 *                 example: "Handles employee-related matters"
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Bad request (e.g., missing data)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /department/{id}:
 *   get:
 *     summary: Get a department by ID
 *     tags: [Departments]
 *     description: Retrieve details of a specific department by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the department
 *     responses:
 *       202:
 *         description: Department details retrieved successfully
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
 *                       description: ID of the department
 *                     name:
 *                       type: string
 *                       description: Name of the department
 *                     description:
 *                       type: string
 *                       description: Description of the department
 *       400:
 *         description: Bad request (e.g., invalid ID)
 *       500:
 *         description: Server error
 */
