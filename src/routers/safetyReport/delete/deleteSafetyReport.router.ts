import { Router, Request, Response } from 'express';
import { delete_safety_report_controller } from '../../../controllers';

const deleteSafetyReportRouter: Router = Router();

deleteSafetyReportRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Safety report id is required',
            });
        }
        const result = await delete_safety_report_controller(id);
        if (!result.success) {
            return res.status(200).json({
                success: false,
                message: result.message,
            });
        }
        return res.status(202).json({ success: true });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

export default deleteSafetyReportRouter;
