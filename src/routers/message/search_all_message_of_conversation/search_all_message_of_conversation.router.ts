import { Request, Response, Router } from 'express';
import { search_all_message_of_conversation_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const searchMessageByConversationRouter: Router = Router();

searchMessageByConversationRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const conversation_id: string | undefined = req.body.conversation_id;
            if (!conversation_id || conversation_id === undefined) {
                return errorResponse(res, 400, 'conversation_id is required');
            }
            const messages = await search_all_message_of_conversation_controller(conversation_id);

            if (!messages?.success) {
                return errorResponse(res, 400, messages?.message || 'Failed to get messages');
            }
            return successResponse(res, 200, messages.data);
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);

export default searchMessageByConversationRouter;
