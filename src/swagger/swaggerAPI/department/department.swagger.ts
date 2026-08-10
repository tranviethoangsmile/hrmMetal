/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: API for managing departments
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DepartmentItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *           nullable: true
 */

/**
 * @swagger
 * /api/version/v1/department/create:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Human Resources"
 *     responses:
 *       201:
 *         description: Department created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DepartmentItem'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/department/getall:
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     responses:
 *       202:
 *         description: Departments retrieved successfully
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
 *                     $ref: '#/components/schemas/DepartmentItem'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/department/getbyid:
 *   post:
 *     summary: Get a department by ID
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 example: "cab9ec71-1a35-483a-bb64-a76f81080d46"
 *     responses:
 *       202:
 *         description: Department retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DepartmentItem'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
