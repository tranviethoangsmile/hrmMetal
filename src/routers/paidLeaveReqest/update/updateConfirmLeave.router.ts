import { Router, Request, Response } from 'express';
import { update_confirm_from_admin_paid_leave_request_controller } from '../../../controllers';
import { IUpdatePaidLeave } from '../../../interfaces';
const updateConfirmRouter: Router = Router();
updateConfirmRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: IUpdatePaidLeave = req.body;

        if (!field?.admin_id && !field?.user_id && !field?.id) {
            throw new Error('missing value request');
        }
        const update_confirm =
            await update_confirm_from_admin_paid_leave_request_controller(
                field,
            );
        if (!update_confirm?.success) {
            throw new Error(update_confirm?.message);
        }
        return res.status(202).json({
            success: true,
            message: update_confirm?.message,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `server error: ${error?.message}`,
        });
    }
});
export default updateConfirmRouter;
