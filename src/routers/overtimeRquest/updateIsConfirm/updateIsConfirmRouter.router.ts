import { Request, Response, Router } from 'express';
import { update_isConfirm_ovetime_request_controller } from '../../../controllers';
import { IUpdateIsConfirmOvertimeRequest } from '../../../interfaces';

const updateIsConfirmOvertimeRequestRouter: Router = Router();
updateIsConfirmOvertimeRequestRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const data: IUpdateIsConfirmOvertimeRequest = req.body;
            if (!data || !data.user_id || !data.id) {
                const missingFields = [
                    !data.user_id && 'user_id',
                    !data.id && 'id',
                ]
                    .filter(Boolean)
                    .join(', ');
                return res.status(400).json({
                    success: false,
                    message: `Missing values: ${missingFields}`,
                });
            }
            const response = await update_isConfirm_ovetime_request_controller(
                data,
            );
            if (!response.success) {
                return res
                    .status(200)
                    .json({ success: false, message: response.message });
            }
            return res.status(202).json({ success: true });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    },
);
export default updateIsConfirmOvertimeRequestRouter;
