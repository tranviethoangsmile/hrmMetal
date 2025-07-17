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
 *             required:
 *               - user_id
 *               - title
 *               - content
 *               - date
 *               - department_id
 *               - solution
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user creating the report
 *                 example: "b1e2c3d4-5678-1234-9abc-1234567890ab"
 *               title:
 *                 type: string
 *                 description: Title of the safety report
 *                 example: "Unsafe working condition"
 *               content:
 *                 type: string
 *                 description: Content/details of the safety report
 *                 example: "There is a spill in the production area."
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the incident (ISO 8601)
 *                 example: "2024-06-01"
 *               department_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the department
 *                 example: "d2e3f4g5-6789-2345-0bcd-2345678901bc"
 *               solution:
 *                 type: string
 *                 description: Proposed solution
 *                 example: "Clean up the spill and place warning signs."
 *               corrective_action:
 *                 type: string
 *                 nullable: true
 *                 description: Corrective action taken (optional)
 *                 example: "Area cleaned and signs posted."
 *               media_path:
 *                 type: string
 *                 nullable: true
 *                 description: Path to attached media file (optional)
 *                 example: "/uploads/safety/2024-06-01/photo.jpg"
 *     responses:
 *       201:
 *         description: Safety report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       400:
 *         description: Missing required fields
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
