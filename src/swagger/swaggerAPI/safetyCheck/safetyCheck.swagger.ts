/**
 * @swagger
 * tags:
 *   name: SafetyChecks
 *   description: API for managing safety checks
 */

/**
 * @swagger
 * /safetyCheck/create:
 *   post:
 *     summary: Create a new safety check
 *     tags: [SafetyChecks]
 *     description: Endpoint to create a new safety check.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user creating the safety check
 *                 example: "user123"
 *               check_details:
 *                 type: string
 *                 description: Details of the safety check
 *                 example: "Inspection of fire extinguishers"
 *     responses:
 *       201:
 *         description: Safety check created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /safetyCheck/searchsafetychecked:
 *   get:
 *     summary: Search completed safety checks
 *     tags: [SafetyChecks]
 *     description: Retrieve a list of completed safety checks.
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: ID of the user to filter safety checks
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to filter safety checks
 *     responses:
 *       200:
 *         description: List of completed safety checks retrieved successfully
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
 *                       check_id:
 *                         type: string
 *                         description: ID of the safety check
 *                       user_id:
 *                         type: string
 *                         description: ID of the user who performed the check
 *                       check_details:
 *                         type: string
 *                         description: Details of the safety check
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date of the safety check
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
