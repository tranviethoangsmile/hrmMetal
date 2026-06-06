"use strict";
/**
 * @swagger
 * tags:
 *   name: Paid Leave Requests
 *   description: API for managing paid leave requests
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     PaidLeaveUserSummary:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         avatar:
 *           type: string
 *           nullable: true
 *         department:
 *           type: object
 *           nullable: true
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *     PaidLeaveRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         date_request:
 *           type: string
 *           format: date
 *         date_leave:
 *           type: string
 *           format: date
 *         reason:
 *           type: string
 *         is_approve:
 *           type: boolean
 *         is_confirm:
 *           type: boolean
 *         user_id:
 *           type: string
 *           format: uuid
 *         leader_id:
 *           type: string
 *           format: uuid
 *         position:
 *           type: string
 *         is_paid:
 *           type: boolean
 *         is_half:
 *           type: boolean
 *         feedback:
 *           type: string
 *           nullable: true
 *         staff:
 *           $ref: '#/components/schemas/PaidLeaveUserSummary'
 *         leader:
 *           $ref: '#/components/schemas/PaidLeaveUserSummary'
 *     PaidLeaveRequestPage:
 *       type: object
 *       properties:
 *         rows:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PaidLeaveRequest'
 *         count:
 *           type: integer
 *           example: 10
 *     PaidLeaveSuccess:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 */
/**
 * @swagger
 * /api/version/v1/paidleave/create:
 *   post:
 *     summary: Create a paid leave request
 *     tags: [Paid Leave Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *               - user_id
 *               - leader_id
 *               - date_request
 *               - date_leave
 *               - position
 *               - is_half
 *             properties:
 *               reason:
 *                 type: string
 *                 example: Family event
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               leader_id:
 *                 type: string
 *                 format: uuid
 *               date_request:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-01"
 *               date_leave:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-03"
 *               position:
 *                 type: string
 *                 example: HINO
 *               is_half:
 *                 type: boolean
 *                 example: false
 *               is_paid:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Paid leave request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PaidLeaveRequest'
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/version/v1/paidleave:
 *   put:
 *     summary: Mark a paid leave request as approved
 *     tags: [Paid Leave Requests]
 *     description: Legacy approve route guarded by very_role middleware.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - user_id
 *               - admin_id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: Used by very_role middleware.
 *               admin_id:
 *                 type: string
 *                 format: uuid
 *               feedback:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       202:
 *         description: Paid leave request updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaidLeaveSuccess'
 *       200:
 *         description: Request processed but update failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Missing id or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: User role is not allowed by very_role middleware
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/version/v1/paidleave/search:
 *   post:
 *     summary: Search paid leave requests
 *     tags: [Paid Leave Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               leader_id:
 *                 type: string
 *                 format: uuid
 *               date_request:
 *                 type: string
 *                 format: date
 *               date_leave:
 *                 type: string
 *                 format: date
 *               position:
 *                 type: string
 *               is_approve:
 *                 type: boolean
 *               is_confirm:
 *                 type: boolean
 *     responses:
 *       202:
 *         description: Search results retrieved successfully
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
 *                     $ref: '#/components/schemas/PaidLeaveRequest'
 *       200:
 *         description: Request processed but search failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /api/version/v1/paidleave/delete:
 *   post:
 *     summary: Delete a paid leave request
 *     tags: [Paid Leave Requests]
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
 *               user_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       202:
 *         description: Paid leave request deleted successfully
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
 *                   example: Paid leave request deleted successfully
 *       200:
 *         description: Request processed but delete failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Missing fields or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
