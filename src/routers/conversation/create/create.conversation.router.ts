import { Router, Request, Response } from 'express';
import { create_conversation_controller } from '../../../controllers';
import { io } from '../../../socket/socketIO';
import { create_conversation_interface as create } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const createConversationRouter: Router = Router();

createConversationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const reqData: create | undefined = req.body;
        if (!reqData || !reqData?.receiver_id || !reqData?.sender_id) {
            return errorResponse(res, 400, 'receiver_id and sender_id are required');
        }
        const value = await create_conversation_controller(reqData);
        if (value?.success) {
            return successResponse(res, 201, value?.data);
        } else {
            return errorResponse(res, 400, value?.message || 'Failed to create conversation');
        }
    } catch (e: any) {
        return errorResponse(res, 500, e?.message || 'Internal server error');
    }
});

export default createConversationRouter;
