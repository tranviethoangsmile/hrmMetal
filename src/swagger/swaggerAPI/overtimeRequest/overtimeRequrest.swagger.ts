/**
 * @swagger
 * tags:
 *   name: OvertimeRequest
 *   description: API for managing Overtime Requests
 */
/**
 * @swagger
 * tags:
 *   name: OvertimeRequest
 *   description: API for managing overtime requests
 *
 * /overtimerequest/create:
 *   post:
 *     summary: Create a new overtime request
 *     tags:
 *       - OvertimeRequest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user requesting overtime.
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the overtime request.
 *                 example: "2023-10-01"
 *               position:
 *                 type: string
 *                 description: Position of the user.
 *                 example: "Software Engineer"
 *               department_id:
 *                 type: string
 *                 description: ID of the department.
 *                 example: "dept-001"
 *               overtime_hours:
 *                 type: number
 *                 description: Number of overtime hours requested.
 *                 example: 4
 *               description:
 *                 type: string
 *                 description: Description or reason for the overtime request.
 *                 example: "Working on project deadline."
 *               leader_id:
 *                 type: string
 *                 description: ID of the leader approving the request.
 *                 example: "leader-123"
 *             required:
 *               - user_id
 *               - date
 *               - position
 *               - department_id
 *               - overtime_hours
 *               - description
 *               - leader_id
 *     responses:
 *       201:
 *         description: Overtime request created successfully.
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
 *                       description: ID of the created overtime request.
 *                       example: "req-001"
 *                     user_id:
 *                       type: string
 *                       description: ID of the user requesting overtime.
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Date of the overtime request.
 *                       example: "2023-10-01"
 *                     overtime_hours:
 *                       type: number
 *                       description: Number of overtime hours requested.
 *                       example: 4
 *       200:
 *         description: Request processed but failed to create overtime request.
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
 *                   example: "Failed to create overtime request."
 *       400:
 *         description: Missing or invalid input data.
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
 *                   example: "Missing values: user_id, date"
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error."
 */
/**
 * @swagger
 * tags:
 *   name: OvertimeRequest
 *   description: API for managing overtime requests
 *
 * /overtimerequest/deletebyid:
 *   post:
 *     summary: Delete an overtime request by ID
 *     tags:
 *       - OvertimeRequest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the overtime request to delete.
 *                 example: "req-001"
 *               user_id:
 *                 type: string
 *                 description: ID of the user requesting the deletion.
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       202:
 *         description: Successfully deleted the overtime request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: Request processed but failed to delete the overtime request.
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
 *                   example: "Failed to delete the overtime request."
 *       400:
 *         description: Missing or invalid input data.
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
 *                   example: "Missing values: id, user_id"
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error."
 */
/**
 * @swagger
 * tags:
 *   name: OvertimeRequest
 *   description: API for managing overtime requests
 *
 * /overtimerequest/getall:
 *   post:
 *     summary: Retrieve all overtime requests
 *     tags:
 *       - OvertimeRequest
 *     responses:
 *       202:
 *         description: Successfully retrieved all overtime requests.
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
 *                         description: ID of the overtime request.
 *                         example: "req-001"
 *                       user_id:
 *                         type: string
 *                         description: ID of the user who made the request.
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date of the overtime request.
 *                         example: "2023-10-01"
 *                       overtime_hours:
 *                         type: number
 *                         description: Number of overtime hours requested.
 *                         example: 4
 *                       description:
 *                         type: string
 *                         description: Reason for the overtime request.
 *                         example: "Working on project deadline."
 *       200:
 *         description: Request processed but failed to retrieve overtime requests.
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
 *                   example: "Failed to retrieve overtime requests."
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error."
 */
/**
 * @swagger
 * tags:
 *   name: OvertimeRequest
 *   description: API for managing overtime requests
 *
 * /overtimerequest/getbyid:
 *   post:
 *     summary: Retrieve an overtime request by ID
 *     tags:
 *       - OvertimeRequest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the overtime request to retrieve.
 *                 example: "req-001"
 *     responses:
 *       202:
 *         description: Successfully retrieved the overtime request.
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
 *                       description: ID of the overtime request.
 *                       example: "req-001"
 *                     user_id:
 *                       type: string
 *                       description: ID of the user who made the request.
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Date of the overtime request.
 *                       example: "2023-10-01"
 *                     overtime_hours:
 *                       type: number
 *                       description: Number of overtime hours requested.
 *                       example: 4
 *                     description:
 *                       type: string
 *                       description: Reason for the overtime request.
 *                       example: "Working on project deadline."
 *       200:
 *         description: Request processed but failed to retrieve the overtime request.
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
 *                   example: "Overtime request not found."
 *       400:
 *         description: Missing or invalid input data.
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
 *                   example: "ID is required."
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error."
 */
/**
 * @swagger
 * tags:
 *   name: OvertimeRequest
 *   description: API for managing overtime requests
 *
 * /overtimerequest/updateisapproved:
 *   post:
 *     summary: Update the approval status of an overtime request
 *     tags:
 *       - OvertimeRequest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the overtime request to update.
 *                 example: "req-001"
 *               is_approved:
 *                 type: boolean
 *                 description: Approval status of the overtime request.
 *                 example: true
 *     responses:
 *       202:
 *         description: Successfully updated the approval status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: Request processed but failed to update the approval status.
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
 *                   example: "Failed to update approval status."
 *       400:
 *         description: Missing or invalid input data.
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
 *                   example: "Missing values: id, is_approved"
 *       500:
 *         description: Internal server error.
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
 *                   example: "Server error :: [error details]"
 */
/**
 * @swagger
 * tags:
 *   name: OvertimeRequest
 *   description: API for managing overtime requests
 *
 * /overtimerequest/updateisconfirm:
 *   post:
 *     summary: Update the confirmation status of an overtime request
 *     tags:
 *       - OvertimeRequest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the overtime request to update.
 *                 example: "req-001"
 *               user_id:
 *                 type: string
 *                 description: ID of the user confirming the overtime request.
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       202:
 *         description: Successfully updated the confirmation status.
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
 *                   example: "Confirmation status updated successfully."
 *       200:
 *         description: Request processed but failed to update the confirmation status.
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
 *                   example: "Failed to update confirmation status."
 *       400:
 *         description: Missing or invalid input data.
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
 *                   example: "Missing values: user_id, id"
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error."
 */
