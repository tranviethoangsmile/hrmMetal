import { Request, Response, Router } from 'express';
import { Configuration, OpenAIApi } from 'openai';
import { io } from '../../socket/socketIO';
import { errorResponse, successResponse } from '../../helpers';

const chatRouter: Router = Router();
const config = new Configuration({
    apiKey: process.env.CHAT_KEY,
});

const openai = new OpenAIApi(config);

chatRouter.post('/', async (req: Request, res: Response) => {
    try {
        const chat = req.body.chat;
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: chat }],
        });
        if (response.status === 200) {
            const botResponse: string | undefined =
                response.data.choices[0].message?.content;
            if (botResponse) {
                for (let i = 0; i < botResponse.length; i++) {
                    setTimeout(() => {
                        io.emit('messgpt', botResponse[i]);
                    }, 5 * i);
                }
            }
            return successResponse(res, 200, { message: botResponse });
        } else {
            return errorResponse(res, 500, 'server chat error');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default chatRouter;
