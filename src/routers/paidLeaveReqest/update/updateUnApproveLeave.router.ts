import { Router, Request, Response } from 'express';
import { update_un_approve_leave_request_controller } from '../../../controllers/paidLeaveRequest/paidLeaveRequest.controller';

const unApproveRouter: Router = Router();
unApproveRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: object | null = req.body;
        if (field != null) {
            const update = await update_un_approve_leave_request_controller(
                field,
            );
            if (update?.success) {
                res.status(201).json({
                    success: true,
                    message: update?.message,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: update?.message,
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Missing data',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});
export default unApproveRouter;
