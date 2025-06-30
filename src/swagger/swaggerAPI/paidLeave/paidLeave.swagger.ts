/**
 * @swagger
 * tags:
 *   name: Paid Leave Requests
 *   description: API for managing paid leave requests
 */

/**
 * @swagger
 * /paidleave/create:
 *   post:
 *     summary: Create a new paid leave request
 *     tags: [Paid Leave Requests]
 *     description: Create a new request for paid leave
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
 *               - leader_id
 *               - date_request
 *               - date_leave
 *               - reason
 *               - position
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user requesting leave
 *                 example: "user_id_123"
 *               leader_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the leader who will approve the request
 *                 example: "leader_id_123"
 *               date_request:
 *                 type: string
 *                 format: date
 *                 description: Date when the request is made
 *                 example: "2024-03-20"
 *               date_leave:
 *                 type: string
 *                 format: date
 *                 description: Date for the requested leave
 *                 example: "2024-03-25"
 *               reason:
 *                 type: string
 *                 description: Reason for requesting leave
 *                 example: "Family event"
 *               position:
 *                 type: string
 *                 description: Position of the requesting user
 *                 example: "Developer"
 *               is_half:
 *                 type: boolean
 *                 description: Whether the leave is for half day
 *                 example: false
 *               is_paid:
 *                 type: boolean
 *                 description: Whether the leave is paid
 *                 example: true
 *     responses:
 *       201:
 *         description: Paid leave request created successfully
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
 *                       description: ID of the created request
 *                       example: "request_id_123"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the requesting user
 *                       example: "user_id_123"
 *                     leader_id:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the approving leader
 *                       example: "leader_id_123"
 *                     date_request:
 *                       type: string
 *                       format: date
 *                       description: Request date
 *                       example: "2024-03-20"
 *                     date_leave:
 *                       type: string
 *                       format: date
 *                       description: Leave date
 *                       example: "2024-03-25"
 *                     reason:
 *                       type: string
 *                       description: Leave reason
 *                       example: "Family event"
 *                     position:
 *                       type: string
 *                       description: User's position
 *                       example: "Developer"
 *                     is_approve:
 *                       type: boolean
 *                       description: Whether the request is approved
 *                       example: false
 *                     is_confirm:
 *                       type: boolean
 *                       description: Whether the request is confirmed by admin
 *                       example: false
 *                     is_half:
 *                       type: boolean
 *                       description: Whether it's a half-day leave
 *                       example: false
 *                     is_paid:
 *                       type: boolean
 *                       description: Whether it's a paid leave
 *                       example: true
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
 *                   example: "Missing values: reason, user_id, leader_id, date_request, date_leave, position"
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
 *                   example: "Sever Error: Internal server error"
 */

/**
 * @swagger
 * /paidleave:
 *   get:
 *     summary: Get all paid leave requests
 *     tags: [Paid Leave Requests]
 *     description: Retrieve a list of all paid leave requests with user and department details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Paid leave requests retrieved successfully
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
 *                         description: Request ID
 *                         example: "request_id_123"
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Leave date
 *                         example: "2024-03-25"
 *                       reason:
 *                         type: string
 *                         description: Leave reason
 *                         example: "Family event"
 *                       is_active:
 *                         type: boolean
 *                         description: Whether the request is active
 *                         example: true
 *                       staff:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: Staff ID
 *                             example: "user_id_123"
 *                           name:
 *                             type: string
 *                             description: Staff name
 *                             example: "John Doe"
 *                           department:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 format: uuid
 *                                 description: Department ID
 *                                 example: "dept_id_123"
 *                               name:
 *                                 type: string
 *                                 description: Department name
 *                                 example: "Engineering"
 *                       leader:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: Leader ID
 *                             example: "leader_id_123"
 *                           name:
 *                             type: string
 *                             description: Leader name
 *                             example: "Jane Smith"
 *                           department:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 format: uuid
 *                                 description: Department ID
 *                                 example: "dept_id_456"
 *                               name:
 *                                 type: string
 *                                 description: Department name
 *                                 example: "Management"
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
 *   put:
 *     summary: Approve a paid leave request
 *     tags: [Paid Leave Requests]
 *     description: Approve a paid leave request (requires leader role)
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
 *                 description: ID of the request to approve
 *                 example: "request_id_123"
 *     responses:
 *       201:
 *         description: Request approved successfully
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
 *                   example: "Request approved successfully"
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
 *                   example: "data not empty"
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
 * /paidleave/search:
 *   post:
 *     summary: Search paid leave requests
 *     tags: [Paid Leave Requests]
 *     description: Search for paid leave requests by various criteria
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: Filter by user ID
 *                 example: "user_id_123"
 *               leader_id:
 *                 type: string
 *                 format: uuid
 *                 description: Filter by leader ID
 *                 example: "leader_id_123"
 *               date_leave:
 *                 type: string
 *                 format: date
 *                 description: Filter by leave date
 *                 example: "2024-03-25"
 *               is_approve:
 *                 type: boolean
 *                 description: Filter by approval status
 *                 example: true
 *               is_confirm:
 *                 type: boolean
 *                 description: Filter by confirmation status
 *                 example: true
 *     responses:
 *       202:
 *         description: Search results retrieved successfully
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
 *                         description: Request ID
 *                         example: "request_id_123"
 *                       date_leave:
 *                         type: string
 *                         format: date
 *                         description: Leave date
 *                         example: "2024-03-25"
 *                       reason:
 *                         type: string
 *                         description: Leave reason
 *                         example: "Family event"
 *                       is_approve:
 *                         type: boolean
 *                         description: Approval status
 *                         example: true
 *                       is_confirm:
 *                         type: boolean
 *                         description: Confirmation status
 *                         example: true
 *                       date_request:
 *                         type: string
 *                         format: date
 *                         description: Request date
 *                         example: "2024-03-20"
 *                       position:
 *                         type: string
 *                         description: User's position
 *                         example: "Developer"
 *                       is_paid:
 *                         type: boolean
 *                         description: Whether it's a paid leave
 *                         example: true
 *                       is_half:
 *                         type: boolean
 *                         description: Whether it's a half-day leave
 *                         example: false
 *                       feedback:
 *                         type: string
 *                         description: Feedback on the request
 *                         example: "Approved"
 *                       staff:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: Staff ID
 *                             example: "user_id_123"
 *                           name:
 *                             type: string
 *                             description: Staff name
 *                             example: "John Doe"
 *                           department:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 format: uuid
 *                                 description: Department ID
 *                                 example: "dept_id_123"
 *                               name:
 *                                 type: string
 *                                 description: Department name
 *                                 example: "Engineering"
 *                       leader:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: Leader ID
 *                             example: "leader_id_123"
 *                           name:
 *                             type: string
 *                             description: Leader name
 *                             example: "Jane Smith"
 *                           department:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 format: uuid
 *                                 description: Department ID
 *                                 example: "dept_id_456"
 *                               name:
 *                                 type: string
 *                                 description: Department name
 *                                 example: "Management"
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
 *                   example: "Missing values"
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
 *                   example: "Sever Error: Internal server error"
 */

/**
 * @swagger
 * /paidleave/unapprove:
 *   post:
 *     summary: Reject a paid leave request
 *     tags: [Paid Leave Requests]
 *     description: Reject a paid leave request with feedback
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
 *               - feedback
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the request to reject
 *                 example: "request_id_123"
 *               feedback:
 *                 type: string
 *                 description: Reason for rejection
 *                 example: "Insufficient staffing on requested date"
 *     responses:
 *       202:
 *         description: Request rejected successfully
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
 *                   example: "Request rejected successfully"
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
 *                   example: "Missing required fields"
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
 * /paidleave/confirm:
 *   post:
 *     summary: Confirm a paid leave request
 *     tags: [Paid Leave Requests]
 *     description: Confirm an approved paid leave request (admin only)
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
 *               - admin_id
 *               - user_id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the request to confirm
 *                 example: "request_id_123"
 *               admin_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the admin confirming the request
 *                 example: "admin_id_123"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user who made the request
 *                 example: "user_id_123"
 *     responses:
 *       202:
 *         description: Request confirmed successfully
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
 *                   example: "Request confirmed successfully"
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
 *                   example: "missing value request"
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
