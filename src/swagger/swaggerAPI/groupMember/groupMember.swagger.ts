/**
 * @swagger
 * tags:
 *   name: GroupMembers
 *   description: API for managing group members
 */

/**
 * @swagger
 * /groupMember/getgroupmemberofuser:
 *   get:
 *     summary: Get group members of a user
 *     tags: [GroupMembers]
 *     description: Retrieve the list of group members associated with a specific user.
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *         example: "user123"
 *     responses:
 *       200:
 *         description: List of group members retrieved successfully
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
 *                       group_id:
 *                         type: string
 *                         description: ID of the group
 *                       member_id:
 *                         type: string
 *                         description: ID of the group member
 *                       member_name:
 *                         type: string
 *                         description: Name of the group member
 *       400:
 *         description: Bad request (missing or invalid user_id)
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
 *                   example: "Invalid user_id"
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
 *                   example: "server error: <error message>"
 */
