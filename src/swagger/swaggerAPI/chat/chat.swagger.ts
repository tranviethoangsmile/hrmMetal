/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: API for interacting with OpenAI's GPT model
 */

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Send a message to the chatbot
 *     tags: [Chat]
 *     description: Endpoint to send a message to OpenAI's GPT model and receive a response.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chat:
 *                 type: string
 *                 description: The user's message to the chatbot
 *                 example: "Hello, how are you?"
 *     responses:
 *       201:
 *         description: Chat response generated successfully
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
 *                   description: The chatbot's response
 *                   example: "I'm doing well, thank you! How can I assist you today?"
 *       200:
 *         description: Chat request failed
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
 *                   example: "server chat error ...!!!"
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
 *                   example: "server error: <error message>"
 */
