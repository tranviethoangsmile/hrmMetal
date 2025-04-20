/**
 * @swagger
 * tags:
 *   name: SafetyReports
 *   description: API for managing safety reports
 */

/**
 * @swagger
 * /safetyReport/create:
 *   post:
 *     summary: Create a new safety report
 *     tags: [SafetyReports]
 *     description: Endpoint to create a new safety report.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user creating the report
 *                 example: "user123"
 *               department_id:
 *                 type: string
 *                 description: ID of the department
 *                 example: "dept456"
 *               report_details:
 *                 type: string
 *                 description: Details of the safety report
 *                 example: "Safety issue in the production area"
 *     responses:
 *       201:
 *         description: Safety report created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /safetyReport/update:
 *   put:
 *     summary: Update an existing safety report
 *     tags: [SafetyReports]
 *     description: Update details of an existing safety report.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               report_id:
 *                 type: string
 *                 description: ID of the safety report to update
 *                 example: "report123"
 *               report_details:
 *                 type: string
 *                 description: Updated details of the safety report
 *                 example: "Updated safety issue details"
 *     responses:
 *       200:
 *         description: Safety report updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /safetyReport/confirm:
 *   post:
 *     summary: Confirm a safety report
 *     tags: [SafetyReports]
 *     description: Confirm a safety report by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               report_id:
 *                 type: string
 *                 description: ID of the safety report to confirm
 *                 example: "report123"
 *     responses:
 *       200:
 *         description: Safety report confirmed successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /safetyReport/delete:
 *   delete:
 *     summary: Delete a safety report
 *     tags: [SafetyReports]
 *     description: Delete a safety report by its ID.
 *     parameters:
 *       - in: query
 *         name: report_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the safety report to delete
 *     responses:
 *       200:
 *         description: Safety report deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /safetyReport/getbyuserid:
 *   get:
 *     summary: Get safety reports by user ID
 *     tags: [SafetyReports]
 *     description: Retrieve safety reports created by a specific user.
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of safety reports retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /safetyReport/getbydepartmentid:
 *   get:
 *     summary: Get safety reports by department ID
 *     tags: [SafetyReports]
 *     description: Retrieve safety reports for a specific department.
 *     parameters:
 *       - in: query
 *         name: department_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the department
 *     responses:
 *       200:
 *         description: List of safety reports retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
