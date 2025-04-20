/**
 * @swagger
 * tags:
 *   name: PaidLeaveRequests
 *   description: API for managing paid leave requests
 */

/**
 * @swagger
 * /paidLeaveRequest/create:
 *   post:
 *     summary: Create a new paid leave request
 *     tags: [PaidLeaveRequests]
 *     description: Endpoint to create a new paid leave request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user requesting leave
 *                 example: "user123"
 *               leave_date:
 *                 type: string
 *                 format: date
 *                 description: Date of the leave
 *                 example: "2025-04-20"
 *               reason:
 *                 type: string
 *                 description: Reason for the leave
 *                 example: "Medical leave"
 *     responses:
 *       201:
 *         description: Paid leave request created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /paidLeaveRequest/search:
 *   get:
 *     summary: Search paid leave requests
 *     tags: [PaidLeaveRequests]
 *     description: Retrieve a list of paid leave requests based on filters.
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: ID of the user to filter leave requests
 *       - in: query
 *         name: leave_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to filter leave requests
 *     responses:
 *       200:
 *         description: List of paid leave requests retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /paidLeaveRequest/update:
 *   put:
 *     summary: Update a paid leave request
 *     tags: [PaidLeaveRequests]
 *     description: Update the status of a paid leave request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               request_id:
 *                 type: string
 *                 description: ID of the leave request to update
 *                 example: "leave123"
 *               status:
 *                 type: string
 *                 description: New status of the leave request
 *                 example: "approved"
 *     responses:
 *       200:
 *         description: Paid leave request updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /paidLeaveRequest/updateconfirm:
 *   put:
 *     summary: Confirm a paid leave request
 *     tags: [PaidLeaveRequests]
 *     description: Confirm a paid leave request by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               request_id:
 *                 type: string
 *                 description: ID of the leave request to confirm
 *                 example: "leave123"
 *     responses:
 *       200:
 *         description: Paid leave request confirmed successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /paidLeaveRequest:
 *   get:
 *     summary: Get all paid leave requests
 *     tags: [PaidLeaveRequests]
 *     description: Retrieve all paid leave requests.
 *     responses:
 *       200:
 *         description: List of all paid leave requests retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /paidLeaveRequest:
 *   put:
 *     summary: Update the active status of a paid leave request
 *     tags: [PaidLeaveRequests]
 *     description: Update the active status of a paid leave request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               request_id:
 *                 type: string
 *                 description: ID of the leave request to update
 *                 example: "leave123"
 *               is_active:
 *                 type: boolean
 *                 description: New active status of the leave request
 *                 example: true
 *     responses:
 *       200:
 *         description: Paid leave request active status updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
