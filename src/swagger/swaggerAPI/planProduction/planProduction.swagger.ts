/**
 * @swagger
 * tags:
 *   name: PlanProductions
 *   description: API for managing production plans
 */

/**
 * @swagger
 * /planProduction/create:
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
 *             properties:
 *               department_id:
 *                 type: string
 *                 description: ID of the department
 *                 example: "dept123"
 *               production_date:
 *                 type: string
 *                 format: date
 *                 description: Date of the production plan
 *                 example: "2025-04-19"
 *               details:
 *                 type: string
 *                 description: Details of the production plan
 *                 example: "Plan for producing 1000 units of product A"
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
 * /planProduction/update:
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
 *             properties:
 *               plan_id:
 *                 type: string
 *                 description: ID of the production plan to update
 *                 example: "plan123"
 *               details:
 *                 type: string
 *                 description: Updated details of the production plan
 *                 example: "Updated plan for producing 1200 units of product A"
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
 * /planProduction/searchbyid:
 *   get:
 *     summary: Search a production plan by ID
 *     tags: [PlanProductions]
 *     description: Retrieve details of a specific production plan by its ID.
 *     parameters:
 *       - in: query
 *         name: plan_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the production plan
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
 * /planProduction/destroy:
 *   delete:
 *     summary: Delete a production plan
 *     tags: [PlanProductions]
 *     description: Delete a production plan by its ID.
 *     parameters:
 *       - in: query
 *         name: plan_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the production plan to delete
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
 * /planProduction/searchbydateanddepartment:
 *   get:
 *     summary: Search production plans by date and department
 *     tags: [PlanProductions]
 *     description: Retrieve production plans for a specific date and department.
 *     parameters:
 *       - in: query
 *         name: department_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the department
 *       - in: query
 *         name: production_date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Date of the production plan
 *     responses:
 *       200:
 *         description: List of production plans retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
