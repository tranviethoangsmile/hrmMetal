/**
 * @swagger
 * tags:
 *   name: DependentSupportAmount
 *   description: API for managing dependent support amounts (số tiền hỗ trợ người phụ thuộc theo năm)
 */

/**
 * @swagger
 * /dependent-support-amount/create:
 *   post:
 *     summary: Create a new dependent support amount record
 *     tags: [DependentSupportAmount]
 *     description: Create a new support amount record for a tax dependent. Can upload supporting document.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - tax_dependent_id
 *               - user_id
 *               - year
 *             properties:
 *               tax_dependent_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the tax dependent
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user (employee) who owns the tax dependent
 *                 example: "123e4567-e89b-12d3-a456-426614174001"
 *               year:
 *                 type: integer
 *                 minimum: 2000
 *                 maximum: 2200
 *                 description: Year of support (integer between 2000-2200)
 *                 example: 2024
 *               supported_amount:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0
 *                 description: Amount of money already supported (must be >= 0)
 *                 example: 5000000
 *               is_supporting_current_year:
 *                 type: boolean
 *                 description: Whether currently supporting this year
 *                 example: true
 *               is_confirm:
 *                 type: boolean
 *                 description: Whether this record is confirmed
 *                 example: false
 *               expected_support_years:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0
 *                 description: Expected number of years to support (integer, must be >= 0)
 *                 example: 4
 *               notes:
 *                 type: string
 *                 description: Additional notes about the support
 *                 example: "Support for child's education"
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Supporting document file (proof of support payment) - Optional
 *     responses:
 *       201:
 *         description: Dependent support amount record created successfully
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
 *                       description: ID of the created record
 *                       example: "123e4567-e89b-12d3-a456-426614174002"
 *                     tax_dependent_id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174001"
 *                     year:
 *                       type: integer
 *                       example: 2024
 *                     supported_amount:
 *                       type: number
 *                       example: 5000000
 *                     is_supporting_current_year:
 *                       type: boolean
 *                       example: true
 *                     is_confirm:
 *                       type: boolean
 *                       example: false
 *                     expected_support_years:
 *                       type: number
 *                       example: 4
 *                     notes:
 *                       type: string
 *                       example: "Support for child's education"
 *                     media_path:
 *                       type: string
 *                       description: URL of uploaded supporting document (if provided)
 *                       example: "https://res.cloudinary.com/example/image/upload/v1234567890/support_doc.jpg"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-20T10:30:00Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-20T10:30:00Z"
 *       200:
 *         description: Request processed but not successful
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
 *                   example: "Failed to create dependent support amount"
 *       400:
 *         description: Bad request (missing required fields or invalid data)
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
 *                   example: "Invalid input: Missing required tax_dependent_id, year, user_id"
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
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /dependent-support-amount/update:
 *   post:
 *     summary: Update a dependent support amount record
 *     tags: [DependentSupportAmount]
 *     description: Update an existing dependent support amount record. Only unconfirmed records can be updated. Can upload/update supporting document.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - user_id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the record to update
 *                 example: "123e4567-e89b-12d3-a456-426614174002"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user (employee) who owns this record (for authorization)
 *                 example: "123e4567-e89b-12d3-a456-426614174001"
 *               supported_amount:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0
 *                 description: Updated supported amount (must be >= 0)
 *                 example: 6000000
 *               is_supporting_current_year:
 *                 type: boolean
 *                 description: Updated support status for current year
 *                 example: false
 *               expected_support_years:
 *                 type: number
 *                 format: decimal
 *                 minimum: 0
 *                 description: Updated expected support years (integer, must be >= 0)
 *                 example: 3
 *               notes:
 *                 type: string
 *                 description: Updated notes
 *                 example: "Updated support information"
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: New supporting document file - Optional. Upload to replace existing document
 *     responses:
 *       202:
 *         description: Dependent support amount record updated successfully
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
 *                   example: "Dependent support amount updated successfully"
 *       200:
 *         description: Request processed but not successful
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
 *                   example: "Failed to update dependent support amount"
 *       400:
 *         description: Bad request (missing required fields or authorization error)
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
 *                   example: "Invalid input: Missing required id, user_id"
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
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /dependent-support-amount/confirm:
 *   post:
 *     summary: Confirm a dependent support amount record (Admin only)
 *     tags: [DependentSupportAmount]
 *     description: Confirm a dependent support amount record. This endpoint requires admin role.
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
 *                 description: ID of the record to confirm
 *                 example: "123e4567-e89b-12d3-a456-426614174002"
 *     responses:
 *       202:
 *         description: Dependent support amount record confirmed successfully
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
 *                   example: "Dependent support amount confirmed successfully"
 *       200:
 *         description: Request processed but not successful
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
 *                   example: "Failed to confirm dependent support amount"
 *       400:
 *         description: Bad request (missing ID)
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
 *                   example: "Invalid input: Missing required id"
 *       401:
 *         description: Unauthorized (admin role required)
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
 *                   example: "Unauthorized: Admin role required"
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
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /dependent-support-amount/delete:
 *   post:
 *     summary: Delete a dependent support amount record
 *     tags: [DependentSupportAmount]
 *     description: Delete a dependent support amount record. Only the owner can delete their records.
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
 *                 description: ID of the record to delete
 *                 example: "123e4567-e89b-12d3-a456-426614174002"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user (employee) who owns this record (for authorization)
 *                 example: "123e4567-e89b-12d3-a456-426614174001"
 *     responses:
 *       202:
 *         description: Dependent support amount record deleted successfully
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
 *                   example: "Dependent support amount deleted successfully"
 *       200:
 *         description: Request processed but not successful
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
 *                   example: "Failed to delete dependent support amount"
 *       400:
 *         description: Bad request (missing required fields or authorization error)
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
 *                   example: "Invalid input: Missing required id, user_id"
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
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /dependent-support-amount/getbyid:
 *   post:
 *     summary: Get dependent support amount by ID
 *     tags: [DependentSupportAmount]
 *     description: Retrieve a specific dependent support amount record by its ID
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
 *                 description: ID of the record to retrieve
 *                 example: "123e4567-e89b-12d3-a456-426614174002"
 *     responses:
 *       202:
 *         description: Dependent support amount record retrieved successfully
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
 *                       description: Record ID
 *                       example: "123e4567-e89b-12d3-a456-426614174002"
 *                     tax_dependent_id:
 *                       type: string
 *                       format: uuid
 *                       description: Tax dependent ID
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       description: User ID
 *                       example: "123e4567-e89b-12d3-a456-426614174001"
 *                     year:
 *                       type: integer
 *                       description: Support year
 *                       example: 2024
 *                     supported_amount:
 *                       type: number
 *                       format: decimal
 *                       description: Amount supported
 *                       example: 5000000
 *                     is_supporting_current_year:
 *                       type: boolean
 *                       description: Supporting current year
 *                       example: true
 *                     is_confirm:
 *                       type: boolean
 *                       description: Confirmed status
 *                       example: false
 *                     expected_support_years:
 *                       type: number
 *                       format: decimal
 *                       description: Expected support years
 *                       example: 4
 *                     notes:
 *                       type: string
 *                       description: Notes
 *                       example: "Support for child's education"
 *                     media_path:
 *                       type: string
 *                       description: URL of supporting document
 *                       example: "https://res.cloudinary.com/example/image/upload/v1234567890/support_doc.jpg"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-20T10:30:00Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-20T10:30:00Z"
 *       200:
 *         description: Request processed but not successful
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
 *                   example: "Dependent support amount not found"
 *       400:
 *         description: Bad request (missing ID)
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
 *                   example: "Invalid input: Missing required id"
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
 *                   example: "Internal server error"
 */
