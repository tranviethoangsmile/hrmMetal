import { Request, Response, Router } from 'express';
import { create_paid_leave_controller } from '../../../controllers';
import { ICreatePaidLeave } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const create_router: Router = Router();

create_router.post('/', async (req: Request, res: Response) => {
    try {
        const data: ICreatePaidLeave = req.body;
        if (
            !data ||
            !data.reason ||
            !data.user_id ||
            !data.leader_id ||
            !data.date_request ||
            !data.date_leave ||
            !data.position
        ) {
            const missingFields = [
                !data.reason && 'reason',
                !data.user_id && 'user_id',
                !data.leader_id && 'leader_id',
                !data.date_request && 'date_request',
                !data.date_leave && 'date_leave',
                !data.position && 'position',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Missing values: ${missingFields}`);
        }
        const result = await create_paid_leave_controller(data);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message || 'Failed to create paid leave request');
        } else {
            return successResponse(res, 201, result?.data);
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default create_router;
