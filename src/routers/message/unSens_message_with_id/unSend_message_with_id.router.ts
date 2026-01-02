import { Request, Response, Router } from 'express';
import { unSend_message_with_id_controller } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const unSendMessageRouter: Router = Router();

unSendMessageRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (!id || typeof id !== 'string') {
            return errorResponse(res, 400, 'id is required and must be a string');
        }
        const result = await unSend_message_with_id_controller(id);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to unsend message');
        }
        return successResponse(res, 200, undefined, 'Message unsent successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default unSendMessageRouter;
