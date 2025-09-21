import { Request, Response, Router } from 'express';
import { delete_paid_leave_request_by_id_controller } from '../../../controllers';
const deletePaidLeaveRouter: Router = Router();

deletePaidLeaveRouter.post('/', async (req: Request, res: Response) => {
    try {
        const delete_value = req.body;
        if (!delete_value.id || !delete_value.user_id) {
            const missingFields = [
                !delete_value.id && 'id',
                !delete_value.user_id && 'user_id',
            ]
                .filter(Boolean)
                .join(', ');
            return res.status(400).json({
                success: false,
                message: `Missing values: ${missingFields}`,
            });
        }
        const result = await delete_paid_leave_request_by_id_controller(
            delete_value,
        );
        if (!result.success) {
            return res.status(200).json({
                success: false,
                message: result?.message,
            });
        }
        return res.status(202).json({
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

export default deletePaidLeaveRouter;
