import { Request, Response, Router } from 'express';
import { create_paid_leave_controller } from '../../../controllers';
import { ICreatePaidLeave } from '../../../interfaces';
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
            return res.status(400).json({
                success: false,
                message: `Missing values: ${missingFields}`,
            });
        }
        const result = await create_paid_leave_controller(data);
        if (!result?.success) {
            res.status(200).json({
                success: false,
                message: result?.message,
            });
        } else {
            res.status(201).json({
                success: true,
                data: result?.data,
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Sever Error ' + error.message,
        });
    }
});

export default create_router;
