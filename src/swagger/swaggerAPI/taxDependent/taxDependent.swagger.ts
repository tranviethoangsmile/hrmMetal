/**
 * @swagger
 * tags:
 *   name: TaxDependent
 *   description: API for managing tax dependents (người phụ thuộc giảm trừ thuế)
 */

/**
 * @swagger
 * /taxdependent/create:
 *   post:
 *     summary: Create a new tax dependent
 *     tags: [TaxDependent]
 *     description: Create a new tax dependent record for tax deduction purposes. Can upload document image (giấy tờ chứng minh).
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - name
 *               - dob
 *               - gender
 *               - relationship
 *               - address
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user (employee) who owns this tax dependent
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               name:
 *                 type: string
 *                 description: Full name of the tax dependent
 *                 example: "Nguyễn Văn A"
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: Date of birth of the tax dependent (format -> yyyy-mm-dd)
 *                 example: "2010-05-15"
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *                 description: Gender of the tax dependent
 *                 example: "MALE"
 *               identification_number:
 *                 type: string
 *                 description: Identification number (CMND/CCCD) of the tax dependent
 *                 example: "001234567890"
 *               phone:
 *                 type: string
 *                 description: Phone number of the tax dependent
 *                 example: "0901234567"
 *               address:
 *                 type: string
 *                 description: Address of the tax dependent
 *                 example: "123 Đường ABC, Quận XYZ, TP.HCM"
 *               relationship:
 *                 type: string
 *                 enum: [CHILD, SPOUSE, PARENT, SIBLING, OTHER]
 *                 description: Relationship to the user (employee)
 *                 example: "CHILD"
 *               tax_code:
 *                 type: string
 *                 description: Tax code of the tax dependent
 *                 example: "TAX123456"
 *               deduction_amount:
 *                 type: number
 *                 format: decimal
 *                 description: Deduction amount for tax calculation
 *                 example: 4400000
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
 *                 description: Status of the tax dependent registration. Default is PENDING.
 *                 example: "PENDING"
 *               notes:
 *                 type: string
 *                 description: Additional notes about the tax dependent
 *                 example: "Con trai đầu lòng"
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Document image file (giấy tờ chứng minh người phụ thuộc) - Optional. Upload image file (jpg, png, pdf, etc.)
 *     responses:
 *       201:
 *         description: Tax dependent created successfully
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
 *                       description: ID of the created tax dependent
 *                       example: "123e4567-e89b-12d3-a456-426614174001"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     name:
 *                       type: string
 *                       example: "Nguyễn Văn A"
 *                     dob:
 *                       type: string
 *                       format: date
 *                       example: "2010-05-15"
 *                     gender:
 *                       type: string
 *                       example: "MALE"
 *                     identification_number:
 *                       type: string
 *                       example: "001234567890"
 *                     phone:
 *                       type: string
 *                       example: "0901234567"
 *                     address:
 *                       type: string
 *                       example: "123 Đường ABC, Quận XYZ, TP.HCM"
 *                     relationship:
 *                       type: string
 *                       example: "CHILD"
 *                     tax_code:
 *                       type: string
 *                       example: "TAX123456"
 *                     deduction_amount:
 *                       type: number
 *                       example: 4400000
 *                     status:
 *                       type: string
 *                       example: "PENDING"
 *                     notes:
 *                       type: string
 *                       example: "Con trai đầu lòng"
 *                     media_path:
 *                       type: string
 *                       description: URL of uploaded document image (if provided)
 *                       example: "https://res.cloudinary.com/example/image/upload/v1234567890/document.jpg"
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
 *                   example: "Failed to create tax dependent"
 *       400:
 *         description: Bad request (missing or invalid input)
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
 *                   example: "Invalid input: Missing required user_id, name, dob, gender, relationship"
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
 * /taxdependent/delete:
 *   post:
 *     summary: Delete a tax dependent
 *     tags: [TaxDependent]
 *     description: Delete a tax dependent record by ID
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
 *                 description: ID of the tax dependent to delete
 *                 example: "123e4567-e89b-12d3-a456-426614174001"
 *     responses:
 *       202:
 *         description: Tax dependent deleted successfully
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
 *                   example: "Tax dependent deleted successfully"
 *       400:
 *         description: Bad request (missing ID or delete failed)
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
 *                   example: "ID is required"
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
 * /taxdependent/update:
 *   put:
 *     summary: Update a tax dependent
 *     tags: [TaxDependent]
 *     description: Update an existing tax dependent record. Only the owner (user_id) can update their tax dependent. Can upload/update document image.
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
 *                 description: ID of the tax dependent to update
 *                 example: "123e4567-e89b-12d3-a456-426614174001"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user (employee) who owns this tax dependent (required for authorization)
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               name:
 *                 type: string
 *                 description: Full name of the tax dependent
 *                 example: "Nguyễn Văn A"
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: Date of birth of the tax dependent (format -> yyyy-mm-dd)
 *                 example: "2010-05-15"
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *                 description: Gender of the tax dependent
 *                 example: "MALE"
 *               identification_number:
 *                 type: string
 *                 description: Identification number (CMND/CCCD) of the tax dependent
 *                 example: "001234567890"
 *               phone:
 *                 type: string
 *                 description: Phone number of the tax dependent
 *                 example: "0901234567"
 *               address:
 *                 type: string
 *                 description: Address of the tax dependent
 *                 example: "123 Đường ABC, Quận XYZ, TP.HCM"
 *               relationship:
 *                 type: string
 *                 enum: [CHILD, SPOUSE, PARENT, SIBLING, OTHER]
 *                 description: Relationship to the user (employee)
 *                 example: "CHILD"
 *               tax_code:
 *                 type: string
 *                 description: Tax code of the tax dependent
 *                 example: "TAX123456"
 *               deduction_amount:
 *                 type: number
 *                 format: decimal
 *                 description: Deduction amount for tax calculation
 *                 example: 4400000
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
 *                 description: Status of the tax dependent registration
 *                 example: "PENDING"
 *               notes:
 *                 type: string
 *                 description: Additional notes about the tax dependent
 *                 example: "Con trai đầu lòng"
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Document image file (giấy tờ chứng minh người phụ thuộc) - Optional. Upload new image to replace existing one
 *     responses:
 *       202:
 *         description: Tax dependent updated successfully
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
 *                   example: "Tax dependent updated successfully"
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
 *                   example: "Failed to update tax dependent"
 *       400:
 *         description: Bad request (missing required fields)
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
 * /taxdependent/getbyuserid:
 *   post:
 *     summary: Get all tax dependents by user ID
 *     tags: [TaxDependent]
 *     description: Retrieve all tax dependents associated with a specific user (employee)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user (employee) to get tax dependents for
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       202:
 *         description: Tax dependents retrieved successfully
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
 *                         description: ID of the tax dependent
 *                         example: "123e4567-e89b-12d3-a456-426614174001"
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       name:
 *                         type: string
 *                         example: "Nguyễn Văn A"
 *                       dob:
 *                         type: string
 *                         format: date
 *                         example: "2010-05-15"
 *                       gender:
 *                         type: string
 *                         example: "MALE"
 *                       identification_number:
 *                         type: string
 *                         example: "001234567890"
 *                       phone:
 *                         type: string
 *                         example: "0901234567"
 *                       address:
 *                         type: string
 *                         example: "123 Đường ABC, Quận XYZ, TP.HCM"
 *                       relationship:
 *                         type: string
 *                         example: "CHILD"
 *                       tax_code:
 *                         type: string
 *                         example: "TAX123456"
 *                       deduction_amount:
 *                         type: number
 *                         example: 4400000
 *                       status:
 *                         type: string
 *                         example: "PENDING"
 *                       notes:
 *                         type: string
 *                         example: "Con trai đầu lòng"
 *                       media_path:
 *                         type: string
 *                         description: URL of document image (giấy tờ chứng minh) - Admin can view this to verify
 *                         example: "https://res.cloudinary.com/example/image/upload/v1234567890/document.jpg"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-20T10:30:00Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-20T10:30:00Z"
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
 *                   example: "Failed to get tax dependents"
 *       400:
 *         description: Bad request (missing user_id)
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
 *                   example: "user_id is required"
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
 * /taxdependent/update-status:
 *   put:
 *     summary: Update tax dependent status (Admin only)
 *     tags: [TaxDependent]
 *     description: Update the status of a tax dependent. This endpoint requires admin role. Status can be PENDING, APPROVED, or REJECTED.
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
 *               - status
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the tax dependent to update
 *                 example: "123e4567-e89b-12d3-a456-426614174001"
 *               status:
 *                 type: string
 *                 enum: [PENDING, APPROVED, REJECTED]
 *                 description: New status for the tax dependent
 *                 example: "APPROVED"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: Optional user_id (not required for status update)
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       202:
 *         description: Tax dependent status updated successfully
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
 *                   example: "Tax dependent status updated successfully"
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
 *                   example: "Failed to update tax dependent status"
 *       400:
 *         description: Bad request (missing required fields)
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
 *                   example: "Invalid input: Missing required id, status"
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

