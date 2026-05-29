/**
 * @swagger
 * tags:
 *   name: Admin Options
 *   description: Shared admin option APIs
 */

/**
 * @swagger
 * /api/version/v1/admin/options/enums:
 *   get:
 *     summary: Get admin enum options
 *     tags: [Admin Options]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Enum options retrieved successfully
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
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *                     positions:
 *                       type: array
 *                       items:
 *                         type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         type: string
 *                     work_shifts:
 *                       type: array
 *                       items:
 *                         type: string
 *                     shifts:
 *                       type: array
 *                       items:
 *                         type: string
 *                     notification_types:
 *                       type: array
 *                       items:
 *                         type: string
 *                     uniform_types:
 *                       type: array
 *                       items:
 *                         type: string
 *                     uniform_sizes:
 *                       type: array
 *                       items:
 *                         type: string
 *                     tax_dependent_statuses:
 *                       type: array
 *                       items:
 *                         type: string
 *       401:
 *         description: Missing or invalid token
 *       403:
 *         description: User does not have permission
 *       500:
 *         description: Server error
 */
