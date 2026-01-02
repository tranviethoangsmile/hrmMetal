import { Request, Response, Router } from 'express';
import { create_delete_message_cotroller } from '../../../controllers';
import { create_delete_message } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const deleteMessageRouter: Router = Router();

deleteMessageRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_delete_message | undefined = req.body;
        if (!field || !field?.message_id || !field.user_id) {
            return errorResponse(res, 400, 'Missing required fields: message_id and user_id');
        }
        const result = await create_delete_message_cotroller(field);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to delete message');
        }
        return successResponse(res, 200, undefined, 'Message deleted successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default deleteMessageRouter;
