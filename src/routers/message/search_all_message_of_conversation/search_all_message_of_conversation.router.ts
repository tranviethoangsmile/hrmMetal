import { Request, Response, Router } from 'express';
import { search_all_message_of_conversation_controller } from '../../../controllers';

const searchMessageByConversationRouter: Router = Router();

searchMessageByConversationRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const conversation_id: string | undefined =
                req.body.conversation_id;
            if (!conversation_id || conversation_id === undefined) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: 'conversation_id is required',
                    });
            }
            const messages =
                await search_all_message_of_conversation_controller(
                    conversation_id,
                );

            if (!messages?.success) {
                return res.status(200).json({
                    success: false,
                    message: messages.message,
                });
            }
            return res.status(202).json({
                success: true,
                data: messages.data,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: `server error: ${error?.message}`,
            });
        }
    },
);

export default searchMessageByConversationRouter;
