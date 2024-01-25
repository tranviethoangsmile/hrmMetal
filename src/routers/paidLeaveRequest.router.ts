import { Router, Request, Response } from 'express';
import {
    create,
    get_all,
    update_is_active,
} from '../controllers/paidLeaveRequest.controller';

import very_role from '../middlewares/veryRoleUpdate.middleware';
const paidLeaveRouter: Router = Router();

paidLeaveRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data: Object | null = req.body;
        if (data != null) {
            const paidLeave = await create(data);
            if (paidLeave.success) {
                res.status(201).json({
                    success: paidLeave?.success,
                    data: paidLeave?.data,
                });
            } else {
                res.status(200).json({
                    success: paidLeave?.success,
                    message: paidLeave?.message,
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Bad Request - data not empty',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

paidLeaveRouter.get('/', async (req: Request, res: Response) => {
    try {
        const paid_leaves = await get_all();
        if (paid_leaves?.success) {
            res.status(201).json({
                success: paid_leaves?.success,
                data: paid_leaves?.data,
            });
        } else {
            res.status(200).json({
                success: paid_leaves?.success,
                message: paid_leaves?.message,
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

paidLeaveRouter.put('/', very_role, async (req: Request, res: Response) => {
    try {
        const data: Object | null = req.body;
        if (data != null) {
            const paid_leave = await update_is_active(data);
            if (paid_leave?.success) {
                res.status(201).json({
                    success: paid_leave?.success,
                    data: paid_leave?.data,
                });
            } else {
                res.status(200).json({
                    success: paid_leave?.success,
                    message: paid_leave?.message,
                });
            }
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});
export default paidLeaveRouter;
