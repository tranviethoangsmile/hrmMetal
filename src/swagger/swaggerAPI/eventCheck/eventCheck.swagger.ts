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
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the event
 *                 example: "Annual Meeting"
 *               description:
 *                 type: string
 *                 description: Description of the event
 *                 example: "Company-wide annual meeting to discuss goals."
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the event
 *                 example: "2025-04-20"
 *               location:
 *                 type: string
 *                 description: Location of the event
 *                 example: "Conference Room A"
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /events/delete:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     description: Delete an event by its ID.
 *     parameters:
 *       - in: query
 *         name: event_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the event to delete
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /events/update:
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     description: Update details of an existing event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: string
 *                 description: ID of the event to update
 *                 example: "event123"
 *               title:
 *                 type: string
 *                 description: Updated title of the event
 *                 example: "Updated Annual Meeting"
 *               description:
 *                 type: string
 *                 description: Updated description of the event
 *                 example: "Updated description for the annual meeting."
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Updated date of the event
 *                 example: "2025-04-25"
 *               location:
 *                 type: string
 *                 description: Updated location of the event
 *                 example: "Conference Room B"
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /events/searchbyid:
 *   get:
 *     summary: Search an event by ID
 *     tags: [Events]
 *     description: Retrieve details of a specific event by its ID.
 *     parameters:
 *       - in: query
 *         name: event_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the event
 *     responses:
 *       200:
 *         description: Event details retrieved successfully
 *       400:
 *         description: Bad request
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
 *       200:
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
 *                     properties:
 *                       event_id:
 *                         type: string
 *                         description: ID of the event
 *                       title:
 *                         type: string
 *                         description: Title of the event
 *                       description:
 *                         type: string
 *                         description: Description of the event
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: Date of the event
 *                       location:
 *                         type: string
 *                         description: Location of the event
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /events/getwithposition:
 *   get:
 *     summary: Get events based on position
 *     tags: [Events]
 *     description: Retrieve events based on the user's position.
 *     parameters:
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         required: true
 *         description: Position of the user
 *         example: "Manager"
 *     responses:
 *       200:
 *         description: List of events retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
