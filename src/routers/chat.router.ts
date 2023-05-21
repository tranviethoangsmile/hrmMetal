import express, { Request, Response, Router } from 'express';
import { Configuration, OpenAIApi } from 'openai';
const chatRouter = Router();
const config = new Configuration({
    apiKey: process.env.CHAT_KEY,
});

const openai = new OpenAIApi(config);

chatRouter.post('/', async (req: Request, res: Response) => {
    try {
        const chat = req.body.chat;
        console.log(chat);
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: chat }],
        });
        if (response.status === 200) {
            const botResponse = response.data.choices[0].message?.content;
            res.status(201).json({
                success: true,
                message: botResponse,
            });
        } else {
            res.status(201).json({
                success: false,
                message: 'server chat error ...!!!',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error.message,
        });
    }
});

export default chatRouter;
