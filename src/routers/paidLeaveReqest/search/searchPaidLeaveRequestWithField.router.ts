import { Request, Response, Router } from 'express';
import { search_leave_request_with_field_controller } from '../../../controllers';
import { ISearchPaidLeave } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const searchLeaveRouter: Router = Router();

searchLeaveRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: ISearchPaidLeave = req.body;
        if (!field) {
            return errorResponse(res, 400, 'Missing values');
        }
        const leaves = await search_leave_request_with_field_controller(field);
        if (leaves?.success) {
            return successResponse(res, 200, leaves?.data);
        } else {
            return errorResponse(res, 400, leaves?.message || 'Failed to search leave requests');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default searchLeaveRouter;
