/**
 * @swagger
 * tags:
 *   name: Payrolls
 *   description: API for managing payrolls
 */

/**
 * @swagger
 * /payroll/create:
 *   post:
 *     summary: Create a new payroll
 *     tags: [Payrolls]
 *     description: Endpoint to create a new payroll record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: string
 *                 description: ID of the employee
 *                 example: "emp123"
 *               salary:
 *                 type: number
 *                 description: Salary amount
 *                 example: 5000
 *               bonus:
 *                 type: number
 *                 description: Bonus amount
 *                 example: 200
 *               deductions:
 *                 type: number
 *                 description: Deductions amount
 *                 example: 100
 *     responses:
 *       201:
 *         description: Payroll created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /payroll/update:
 *   put:
 *     summary: Update an existing payroll
 *     tags: [Payrolls]
 *     description: Update details of an existing payroll record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payroll_id:
 *                 type: string
 *                 description: ID of the payroll record to update
 *                 example: "payroll123"
 *               salary:
 *                 type: number
 *                 description: Updated salary amount
 *                 example: 5500
 *               bonus:
 *                 type: number
 *                 description: Updated bonus amount
 *                 example: 300
 *               deductions:
 *                 type: number
 *                 description: Updated deductions amount
 *                 example: 150
 *     responses:
 *       200:
 *         description: Payroll updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /payroll/search:
 *   get:
 *     summary: Search payroll records
 *     tags: [Payrolls]
 *     description: Retrieve a list of payroll records based on filters.
 *     parameters:
 *       - in: query
 *         name: employee_id
 *         schema:
 *           type: string
 *         description: ID of the employee to filter payroll records
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to filter payroll records
 *     responses:
 *       200:
 *         description: List of payroll records retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /payroll/searchbyid:
 *   get:
 *     summary: Search a payroll record by ID
 *     tags: [Payrolls]
 *     description: Retrieve details of a specific payroll record by its ID.
 *     parameters:
 *       - in: query
 *         name: payroll_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the payroll record
 *     responses:
 *       200:
 *         description: Payroll record details retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /payroll/destroy:
 *   delete:
 *     summary: Delete a payroll record
 *     tags: [Payrolls]
 *     description: Delete a payroll record by its ID.
 *     parameters:
 *       - in: query
 *         name: payroll_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the payroll record to delete
 *     responses:
 *       200:
 *         description: Payroll record deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
