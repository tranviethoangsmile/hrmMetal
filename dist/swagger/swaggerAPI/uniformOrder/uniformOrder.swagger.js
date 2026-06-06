"use strict";
/**
 * @swagger
 * tags:
 *   name: UniformOrders
 *   description: API for managing uniform orders
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     UniformOrderItemInput:
 *       type: object
 *       required:
 *         - uniform_type
 *         - uniform_size
 *         - quantity
 *       properties:
 *         uniform_type:
 *           type: string
 *           enum: [WORK JAKET, WORK PANTS, COVERALLS, REFLECTIVE VEST, ANTI STATIC CLOTHING, FLAME RESISTANT, WORK GLOVES, SAFETY SHOES, SAFETY HELMET, WORK SHOES, WORK TROUSERS]
 *           example: "WORK JAKET"
 *         uniform_size:
 *           type: string
 *           enum: [XS, S, M, L, XL, XXL, XXXL, "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"]
 *           example: "L"
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           example: 2
 *     UniformOrder:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         position:
 *           type: string
 *           enum: [HINO, IZUMO, KYOTO, OSAKA, TOKYO, COMPORRATION]
 *         uniform_type:
 *           type: string
 *         uniform_size:
 *           type: string
 *         quantity:
 *           type: integer
 *         date:
 *           type: string
 *           format: date
 *         order_status:
 *           type: string
 *           enum: [pending, processing, completed, cancelled]
 *           default: pending
 *         delivery_date:
 *           type: string
 *           format: date
 *           nullable: true
 *         notes:
 *           type: string
 *           nullable: true
 *     UniformOrderPage:
 *       type: object
 *       properties:
 *         rows:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UniformOrder'
 *         count:
 *           type: integer
 *           example: 3
 */
/**
 * @swagger
 * /uniformorder/create:
 *   post:
 *     summary: Create uniform orders
 *     tags: [UniformOrders]
 *     description: Creates one uniform order record for each item in the items array. order_status defaults to pending.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - position
 *               - date
 *               - items
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               position:
 *                 type: string
 *                 enum: [HINO, IZUMO, KYOTO, OSAKA, TOKYO, COMPORRATION]
 *                 example: "HINO"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-06"
 *               delivery_date:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *                 example: "2026-06-10"
 *               order_status:
 *                 type: string
 *                 enum: [pending, processing, completed, cancelled]
 *                 default: pending
 *                 example: "pending"
 *               notes:
 *                 type: string
 *                 nullable: true
 *                 example: "Need before next shift"
 *               items:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   $ref: '#/components/schemas/UniformOrderItemInput'
 *     responses:
 *       201:
 *         description: Uniform orders created successfully
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
 *                     $ref: '#/components/schemas/UniformOrder'
 *       400:
 *         description: Missing required fields or invalid item data
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /uniformorder/search/withposition:
 *   post:
 *     summary: Search uniform orders by position
 *     tags: [UniformOrders]
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
 *                 enum: [HINO, IZUMO, KYOTO, OSAKA, TOKYO, COMPORRATION]
 *                 example: "HINO"
 *     responses:
 *       202:
 *         description: Uniform orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/UniformOrderPage'
 *       200:
 *         description: Request processed but uniform orders were not found
 *       400:
 *         description: Position is required
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /uniformorder/search/withuserid:
 *   post:
 *     summary: Search uniform orders by user and status
 *     tags: [UniformOrders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - order_status
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               order_status:
 *                 type: string
 *                 enum: [pending, processing, completed, cancelled]
 *                 example: "pending"
 *     responses:
 *       202:
 *         description: Uniform orders retrieved successfully
 *       200:
 *         description: Request processed but uniform orders were not found
 *       400:
 *         description: order_status and user_id are required
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /uniformorder/delete:
 *   post:
 *     summary: Delete a uniform order
 *     tags: [UniformOrders]
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
 *     responses:
 *       202:
 *         description: Uniform order deleted successfully
 *       200:
 *         description: Request processed but delete failed
 *       400:
 *         description: id is required
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /uniformorder/getuniformorderdetail:
 *   post:
 *     summary: Get uniform order details
 *     tags: [UniformOrders]
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
 *     responses:
 *       202:
 *         description: Uniform order details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/UniformOrder'
 *       200:
 *         description: Request processed but uniform order was not found
 *       400:
 *         description: id is required
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /uniformorder/update:
 *   post:
 *     summary: Update a uniform order
 *     tags: [UniformOrders]
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
 *               uniform_size:
 *                 type: string
 *                 enum: [XS, S, M, L, XL, XXL, XXXL, "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"]
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *               delivery_date:
 *                 type: string
 *                 format: date
 *               order_status:
 *                 type: string
 *                 enum: [pending, processing, completed, cancelled]
 *               notes:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       202:
 *         description: Uniform order updated successfully
 *       200:
 *         description: Request processed but update failed
 *       400:
 *         description: id is required
 *       500:
 *         description: Server error
 */
