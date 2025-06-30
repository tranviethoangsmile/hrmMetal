/**
 * @swagger
 * tags:
 *   name: Payroll
 *   description: API for managing employee payroll records
 */

/**
 * @swagger
 * /payroll/create:
 *   post:
 *     summary: Create a new payroll record
 *     tags: [Payroll]
 *     description: Create a new payroll record for an employee
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - pay_date
 *               - user_id
 *               - gross_salary
 *               - net_salary
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the payroll record (YYYY-MM-DD)
 *                 example: "2024-03-20"
 *               pay_date:
 *                 type: string
 *                 format: date
 *                 description: Date when the salary will be paid (YYYY-MM-DD)
 *                 example: "2024-03-25"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the employee
 *                 example: "user_id_123"
 *               gross_salary:
 *                 type: number
 *                 description: Gross salary amount before deductions
 *                 example: 5000
 *               net_salary:
 *                 type: number
 *                 description: Net salary amount after deductions
 *                 example: 4200
 *     responses:
 *       201:
 *         description: Payroll record created successfully
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
 *                   description: Created payroll record details
 *       200:
 *         description: Request processed but failed
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
 *                   example: "Failed to create payroll record"
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
 *                   example: "Invalid input: Missing required date, pay_date, user_id, gross_salary, net_salary"
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
 *                   example: "server error: Internal server error"
 */

/**
 * @swagger
 * /payroll/search:
 *   post:
 *     summary: Search payroll records for a user in a specific month
 *     tags: [Payroll]
 *     description: Retrieve payroll records for a specific user in a given month
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - date
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the employee
 *                 example: "user_id_123"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date to search payroll records (YYYY-MM-DD)
 *                 example: "2024-03-01"
 *     responses:
 *       202:
 *         description: Payroll records found successfully
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
 *                         description: Payroll record ID
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Payroll date
 *                       pay_date:
 *                         type: string
 *                         format: date
 *                         description: Payment date
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         description: Employee ID
 *                       gross_salary:
 *                         type: number
 *                         description: Gross salary amount
 *                       net_salary:
 *                         type: number
 *                         description: Net salary amount
 *       200:
 *         description: Request processed but failed
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
 *                   example: "No payroll records found"
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
 *                   example: "Invalid request"
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
 *                   example: "server error: Internal server error"
 */

/**
 * @swagger
 * /payroll/searchbyid:
 *   post:
 *     summary: Get payroll record by ID
 *     tags: [Payroll]
 *     description: Retrieve a specific payroll record by its ID
 *     security:
 *       - bearerAuth: []
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
 *                 description: ID of the payroll record
 *                 example: "payroll_id_123"
 *     responses:
 *       202:
 *         description: Payroll record found successfully
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
 *                       description: Payroll record ID
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Payroll date
 *                     pay_date:
 *                       type: string
 *                       format: date
 *                       description: Payment date
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: Employee ID
 *                     gross_salary:
 *                       type: number
 *                       description: Gross salary amount
 *                     net_salary:
 *                       type: number
 *                       description: Net salary amount
 *       200:
 *         description: Request processed but failed
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
 *                   example: "Payroll record not found"
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
 *                   example: "id is required"
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
 *                   example: "server error: Internal server error"
 */

/**
 * @swagger
 * /payroll/update:
 *   post:
 *     summary: Update a payroll record
 *     tags: [Payroll]
 *     description: Update an existing payroll record
 *     security:
 *       - bearerAuth: []
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
 *                 description: ID of the payroll record to update
 *                 example: "payroll_id_123"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Updated payroll date (YYYY-MM-DD)
 *                 example: "2024-03-20"
 *               pay_date:
 *                 type: string
 *                 format: date
 *                 description: Updated payment date (YYYY-MM-DD)
 *                 example: "2024-03-25"
 *               gross_salary:
 *                 type: number
 *                 description: Updated gross salary amount
 *                 example: 5500
 *               net_salary:
 *                 type: number
 *                 description: Updated net salary amount
 *                 example: 4600
 *     responses:
 *       202:
 *         description: Payroll record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "update payroll successfully"
 *       200:
 *         description: Request processed but failed
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
 *                   example: "Failed to update payroll record"
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
 *                   example: "bad request"
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
 *                   example: "server error: Internal server error"
 */

/**
 * @swagger
 * /payroll/destroy:
 *   post:
 *     summary: Delete a payroll record
 *     tags: [Payroll]
 *     description: Delete an existing payroll record by ID
 *     security:
 *       - bearerAuth: []
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
 *                 description: ID of the payroll record to delete
 *                 example: "payroll_id_123"
 *     responses:
 *       202:
 *         description: Payroll record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: Request processed but failed
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
 *                   example: "Failed to delete payroll record"
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
 *                   example: "id is required"
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
 *                   example: "server error: Internal server error"
 */
