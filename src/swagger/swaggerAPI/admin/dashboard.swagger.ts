/**
 * @swagger
 * tags:
 *   name: Dashboards
 *   description: Dashboard APIs for admin and leader roles
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/summarys/summarys:
 *   get:
 *     summary: Get admin dashboard summary
 *     tags: [Dashboards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: Admin dashboard summary retrieved successfully
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
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     data:
 *                       type: object
 *                       properties:
 *                         rows:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/PaidLeaveRequest'
 *                         count:
 *                           type: integer
 *                           example: 3
 *       203:
 *         description: Request processed but summary data was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Missing user position from token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: User does not have permission
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/version/v1/dashboards/admin/confirm/paid-leave-confirm:
 *   post:
 *     summary: Confirm an approved paid leave request as admin
 *     tags: [Dashboards]
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
 *               - user_id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               feedback:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       202:
 *         description: Paid leave request confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaidLeaveSuccess'
 *       200:
 *         description: Request processed but confirm failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Missing required fields or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: User does not have permission
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/version/v1/dashboards/leader/aprove-paid-leave-request:
 *   post:
 *     summary: Approve or reject a paid leave request as leader
 *     tags: [Dashboards]
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
 *               - is_approve
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               is_approve:
 *                 type: boolean
 *                 example: true
 *               feedback:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       202:
 *         description: Paid leave approval updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaidLeaveSuccess'
 *       200:
 *         description: Request processed but approval update failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Missing required fields or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: User does not have permission
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
