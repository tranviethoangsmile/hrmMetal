import { Request, Response, Router } from 'express';
import { delete_overtime_request_by_id_controller } from '../../../controllers';
import { IDeleteOvertimeRequest } from '../../../interfaces';
const deleteOvertimeRequestByIdRouter: Router = Router();
deleteOvertimeRequestByIdRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const data: IDeleteOvertimeRequest = req.body;
            if (!data || !data.id || !data.user_id) {
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
            const response = await delete_overtime_request_by_id_controller(
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
export default deleteOvertimeRequestByIdRouter;
