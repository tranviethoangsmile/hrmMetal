/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         user_name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         position:
 *           type: string
 *         employee_id:
 *           type: integer
 *         department_id:
 *           type: string
 *           format: uuid
 *         phone:
 *           type: string
 *           nullable: true
 *         avatar:
 *           type: string
 *           nullable: true
 *         begin_date:
 *           type: string
 *           format: date
 *         is_active:
 *           type: boolean
 *         is_admin:
 *           type: boolean
 *         is_officer:
 *           type: boolean
 *         is_offical_staff:
 *           type: boolean
 *         salary_hourly:
 *           type: number
 *         shift_night_pay:
 *           type: number
 *         travel_allowance_pay:
 *           type: number
 *         paid_days:
 *           type: number
 */

/**
 * @swagger
 * /api/version/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users retrieved successfully
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
 *                     $ref: '#/components/schemas/UserItem'
 *       500:
 *         description: Server error
 *
 *   put:
 *     summary: Update a user
 *     tags: [Users]
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
 *                 type: integer
 *                 description: User ID
 *                 example: 123
 *               name:
 *                 type: string
 *                 example: "Nguyen Van A"
 *               user_name:
 *                 type: string
 *                 example: "nguyenvana"
 *               email:
 *                 type: string
 *                 example: "a@example.com"
 *               password:
 *                 type: string
 *                 example: "secret123"
 *               dob:
 *                 type: string
 *                 format: date
 *               phone:
 *                 type: string
 *                 example: "0901234567"
 *               avatar:
 *                 type: string
 *                 nullable: true
 *               ic_id:
 *                 type: string
 *               employee_id:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *               is_admin:
 *                 type: boolean
 *               role:
 *                 type: string
 *               position:
 *                 type: string
 *               department_id:
 *                 type: string
 *                 format: uuid
 *               begin_date:
 *                 type: string
 *                 format: date
 *               is_offical_staff:
 *                 type: boolean
 *               salary_hourly:
 *                 type: number
 *               shift_night_pay:
 *                 type: number
 *               travel_allowance_pay:
 *                 type: number
 *               paid_days:
 *                 type: number
 *     responses:
 *       202:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       202:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/UserItem'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       202:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/users/getuserwithdepartmentid:
 *   post:
 *     summary: Get users by department ID
 *     tags: [Users]
 *     description: Expected request body includes `department_id`. Current router-level validation only rejects `null` values before forwarding to the controller.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - department_id
 *             properties:
 *               department_id:
 *                 type: string
 *                 format: uuid
 *                 example: "cab9ec71-1a35-483a-bb64-a76f81080d46"
 *     responses:
 *       202:
 *         description: Users retrieved successfully
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
 *                     $ref: '#/components/schemas/UserItem'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/users/upload-avatar:
 *   post:
 *     summary: Upload a user avatar
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - media_path
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               media_path:
 *                 type: string
 *                 description: Avatar path passed by the client and mapped to `avatar` in the server.
 *                 example: "/uploads/avatar.png"
 *     responses:
 *       202:
 *         description: Avatar uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
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
 *                   example: "bad request without avatar, user_id"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/users/finduserwithfield:
 *   post:
 *     summary: Find users by field
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - position
 *             properties:
 *               position:
 *                 type: string
 *                 example: "HINO"
 *     responses:
 *       202:
 *         description: Users retrieved successfully
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
 *                     $ref: '#/components/schemas/UserItem'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/users/findbyname:
 *   post:
 *     summary: Find a user by name
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nguyen Van A"
 *     responses:
 *       202:
 *         description: Users retrieved successfully
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
 *                     $ref: '#/components/schemas/UserItem'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/version/v1/users/getalluserforotrequestfeature:
 *   post:
 *     summary: Get users for overtime request feature
 *     tags: [Users]
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
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       202:
 *         description: Users retrieved successfully
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
 *                     $ref: '#/components/schemas/UserItem'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
