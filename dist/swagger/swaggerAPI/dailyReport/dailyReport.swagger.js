"use strict";
/**
 * @swagger
 * tags:
 *   name: Daily Reports
 *   description: API for managing daily production reports
 */
/**
 * @swagger
 * /api/version/v1/dailyreport/create:
 *   post:
 *     summary: Create a new daily report
 *     tags: [Daily Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product, user_id, department_id, date, shift, quantity, good_quantity, defective_quantity, cycle_time, operated_time, shutdown_time, operator_history]
 *             properties:
 *               product: { type: string, example: "DF93_3" }
 *               user_id: { type: string, format: uuid, example: "9662f0be-b35f-4ab3-a90b-2110f87b4868" }
 *               department_id: { type: string, format: uuid, example: "782a2935-712b-4df7-8c64-486a5426a47d" }
 *               date: { type: string, format: date, example: "2024-05-10" }
 *               shift: { type: string, enum: [A, B], example: "A" }
 *               quantity: { type: number, example: 10 }
 *               good_quantity: { type: number, example: 10 }
 *               defective_quantity: { type: number, example: 10 }
 *               cycle_time: {type: number, example: 0.9 }
 *               operated_time: { type: number, example: 480 }
 *               shutdown_time: { type: number, example: 85 }
 *               operator_history: { type: string, example: "Operator A" }
 *               errors:
 *                 type: array
 *                 default: []
 *                 items:
 *                   type: object
 *                   required: [code, description, shutdown_time, error_date]
 *                   properties:
 *                     code: { type: string, example: "C01" }
 *                     description: { type: string, example: "Sensor issue" }
 *                     shutdown_time: { type: number, example: 10 }
 *                     error_date: { type: string, format: date, example: "2024-05-10" }
 *     responses:
 *       201: { description: Daily report created successfully }
 *       400: { description: Bad request }
 *       500: { description: Internal server error }
 */
/**
 * @swagger
 * /api/version/v1/dailyreport/getall:
 *   post:
 *     summary: Get all daily reports with filters
 *     tags: [Daily Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [department_id]
 *             properties:
 *               date: { type: string, format: date, example: "2024-05-10" }
 *               department_id: { type: string, format: uuid, example: "782a2935-712b-4df7-8c64-486a5426a47d" }
 *               product: { type: string, example: "DF93_3" }
 *               shift: { type: string, enum: [A, B], example: "A" }
 *               user_id: { type: string, format: uuid }
 *     responses:
 *       200: { description: Reports retrieved successfully }
 *       400: { description: Bad request }
 *       500: { description: Internal server error }
 */
/**
 * @swagger
 * /api/version/v1/dailyreport/search:
 *   post:
 *     summary: Search daily reports
 *     tags: [Daily Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 description: Date string is parsed with format YYYY/MM/DD in search router
 *                 example: "2024/05/10"
 *               department_id: { type: string, format: uuid }
 *               product: { type: string, example: "DF93_3" }
 *               shift: { type: string, enum: [A, B], example: "A" }
 *     responses:
 *       200: { description: Reports found successfully }
 *       400: { description: Bad request }
 *       500: { description: Internal server error }
 */
/**
 * @swagger
 * /api/version/v1/dailyreport/{id}:
 *   get:
 *     summary: Get daily report by ID
 *     tags: [Daily Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200: { description: Report found successfully }
 *       400: { description: Bad request }
 *       404: { description: Report not found }
 *       500: { description: Internal server error }
 */
/**
 * @swagger
 * /api/version/v1/dailyreport:
 *   post:
 *     summary: Create daily report (legacy endpoint)
 *     description: Legacy create endpoint kept for backward compatibility. Prefer `/dailyreport/create`.
 *     deprecated: true
 *     tags: [Daily Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201: { description: Daily report created successfully }
 *       400: { description: Bad request }
 *       500: { description: Internal server error }
 */
