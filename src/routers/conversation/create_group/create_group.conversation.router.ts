import { Router, Request, Response } from 'express';
import { create_conversation_group_controller } from '../../../controllers';
import { create_conversation_group_interface as create } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const createGroupMessageRouter: Router = Router();

createGroupMessageRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data: create | undefined = req.body;
        if (
            !data ||
            typeof data?.title !== 'string' ||
            typeof data?.sender_id !== 'string'
        ) {
            return errorResponse(res, 400, 'title and sender_id are required');
        }

        if (!Array.isArray(data?.receivers) || data?.receivers.length < 2) {
            return errorResponse(res, 400, 'receivers array must have at least 2 members');
        }

        const conversation = await create_conversation_group_controller(data);
        if (!conversation?.success) {
            return errorResponse(res, 400, conversation?.message || 'Failed to create group conversation');
        }
        return successResponse(res, 201, { conversation_id: conversation?.data?.conversation_id });
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});
export default createGroupMessageRouter;
