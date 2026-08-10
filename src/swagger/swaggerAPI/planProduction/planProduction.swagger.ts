/**
 * @swagger
 * tags:
 *   name: PlanProductions
 *   description: API for managing production plans
 */

/**
 * @swagger
 * /api/version/v1/planproduction/create:
 *   post:
 *     summary: Create a new production plan
 *     tags: [PlanProductions]
 *     description: Endpoint to create a new production plan.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - department_id
 *               - date
 *               - quantity
 *               - product
 *               - position
 *               - operation_time
 *               - work_shift
 *               - production_line
 *             properties:
 *               department_id:
 *                 type: string
 *                 description: ID of the department
 *                 example: "dept123"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the production plan
 *                 example: "2025-04-19"
 *               quantity:
 *                 type: number
 *                 example: 1000
 *               product:
 *                 type: string
 *                 example: "D042F_PAO_DC4"
 *               position:
 *                 type: string
 *                 example: "STAFF"
 *               is_custom:
 *                 type: boolean
 *                 nullable: true
 *               operation_time:
 *                 type: number
 *                 example: 8
 *               work_shift:
 *                 type: string
 *                 example: "DAY"
 *               production_line:
 *                 type: string
 *                 example: "LINE_1"
 *     responses:
 *       201:
 *         description: Production plan created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/planproduction/update:
 *   put:
 *     summary: Update an existing production plan
 *     tags: [PlanProductions]
 *     description: Update details of an existing production plan.
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
 *                 description: ID of the production plan to update
 *                 example: "plan123"
 *               department_id:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               quantity:
 *                 type: number
 *               product:
 *                 type: string
 *               position:
 *                 type: string
 *               is_custom:
 *                 type: boolean
 *                 nullable: true
 *               operation_time:
 *                 type: number
 *               work_shift:
 *                 type: string
 *               production_line:
 *                 type: string
 *     responses:
 *       200:
 *         description: Production plan updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/planproduction/searchbyid:
 *   post:
 *     summary: Search a production plan by ID
 *     tags: [PlanProductions]
 *     description: Retrieve details of a specific production plan by its ID.
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
 *                 description: ID of the production plan
 *                 example: "plan123"
 *     responses:
 *       200:
 *         description: Production plan details retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/planproduction/destroy:
 *   post:
 *     summary: Delete a production plan
 *     tags: [PlanProductions]
 *     description: Delete a production plan by its ID.
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
 *                 description: ID of the production plan to delete
 *                 example: "plan123"
 *     responses:
 *       200:
 *         description: Production plan deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/planproduction/searchbydateanddepartment:
 *   post:
 *     summary: Search production plans by date and department
 *     tags: [PlanProductions]
 *     description: Retrieve production plans for a specific date and department.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - department_id
 *               - start_date
 *               - end_date
 *             properties:
 *               department_id:
 *                 type: string
 *                 description: ID of the department
 *                 example: "dept123"
 *               start_date:
 *                 type: string
 *                 format: date
 *                 description: Start date of the search range
 *               end_date:
 *                 type: string
 *                 format: date
 *                 description: End date of the search range
 *     responses:
 *       200:
 *         description: List of production plans retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
