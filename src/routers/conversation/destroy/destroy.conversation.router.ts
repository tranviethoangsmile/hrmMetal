import { Router, Request, Response } from 'express';
import { delete_conversation_controller } from '../../../controllers';
import { create_delete_conversation } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const destroyConversationRouter: Router = Router();

destroyConversationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_delete_conversation | undefined = req.body;
        if (!field || !field?.conversation_id || !field?.user_id) {
            return errorResponse(res, 400, 'conversation_id and user_id are required');
        }
        const dlConversation = await delete_conversation_controller({
            ...field,
        });
        if (!dlConversation?.success) {
            return errorResponse(res, 400, dlConversation?.message || 'Failed to delete conversation');
        }
        return successResponse(res, 200, dlConversation?.data, 'Conversation deleted successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default destroyConversationRouter;
