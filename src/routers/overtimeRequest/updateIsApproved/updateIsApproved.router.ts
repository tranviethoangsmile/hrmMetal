import { Request, Response, Router } from 'express';
import { update_approved_admin_overtime_request_controller } from '../../../controllers';
import { IUpdateOvertimeRequest } from '../../../interfaces';
const updateIsApprovedRouter = Router();
updateIsApprovedRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data: IUpdateOvertimeRequest = req.body;
        if (!data || !data.user_id || !data.id) {
            const missingFields = [!data.user_id && 'user_id', !data.id && 'id']
                .filter(Boolean)
                .join(', ');
            return res.status(400).json({
                success: false,
                message: `Missing values: ${missingFields}`,
            });
        }
        const result = await update_approved_admin_overtime_request_controller(
            data,
        );
        if (!result.success) {
            return res.status(200).json({
                success: false,
                message: result.message,
            });
        }
        return res.status(202).json({
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Server error :: ${error}`,
        });
    }
});

export default updateIsApprovedRouter;
