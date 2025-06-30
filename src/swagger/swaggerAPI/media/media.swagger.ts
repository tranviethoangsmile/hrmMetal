/**
 * @swagger
 * tags:
 *   name: Media
 *   description: API for accessing media files
 */

/**
 * @swagger
 * /media/uploads/{filename}:
 *   get:
 *     summary: Get a media file by filename
 *     tags: [Media]
 *     description: Retrieve a media file from the uploads directory
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         description: Name of the file to retrieve
 *         schema:
 *           type: string
 *           example: "image.jpg"
 *     responses:
 *       200:
 *         description: Media file retrieved successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
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
 *                   example: "File not found"
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
