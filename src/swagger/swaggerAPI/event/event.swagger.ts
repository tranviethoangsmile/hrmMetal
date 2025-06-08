/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API for managing events
 */

/**
 * @swagger
 * /events/create:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     description: Endpoint to create a new event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - date_start
 *               - date_end
 *               - position
 *               - is_safety
 *               - is_active
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Họp tổng kết"
 *               description:
 *                 type: string
 *                 example: "Họp tổng kết cuối năm cho toàn công ty."
 *               date_start:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-01"
 *               date_end:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-01"
 *               position:
 *                 type: string
 *                 example: "Nhân viên"
 *               is_safety:
 *                 type: boolean
 *                 example: false
 *               is_active:
 *                 type: boolean
 *                 example: true
 *               media:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: Event created successfully
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
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input
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
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /events/delete:
 *   post:
 *     summary: Delete an event
 *     tags: [Events]
 *     description: Delete an event by its ID.
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
 *                 example: "event_id_123"
 *     responses:
 *       202:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: Delete failed
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
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /events/update:
 *   post:
 *     summary: Update an event
 *     tags: [Events]
 *     description: Update details of an existing event.
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
 *                 example: "event_id_123"
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               is_safety:
 *                 type: boolean
 *               is_active:
 *                 type: boolean
 *               media:
 *                 type: string
 *               date_start:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-01"
 *               date_end:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-01"
 *               position:
 *                 type: string
 *     responses:
 *       202:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       200:
 *         description: Update failed
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
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /events/getall:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     description: Retrieve a list of all events.
 *     responses:
 *       202:
 *         description: List of events retrieved successfully
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
 *                 message:
 *                   type: string
 *       200:
 *         description: Get failed
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
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /events/searchbyid:
 *   post:
 *     summary: Search an event by ID
 *     tags: [Events]
 *     description: Retrieve details of a specific event by its ID.
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
 *                 example: "event_id_123"
 *     responses:
 *       202:
 *         description: Event details retrieved successfully
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
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /events/getwithposition:
 *   post:
 *     summary: Get events based on position
 *     tags: [Events]
 *     description: Retrieve events based on the user's position.
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
 *                 example: "Nhân viên"
 *     responses:
 *       202:
 *         description: List of events retrieved successfully
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
 *                 message:
 *                   type: string
 *       200:
 *         description: Get failed
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
 *       500:
 *         description: Server error
 */
