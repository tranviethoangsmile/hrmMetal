import { Router, Request, Response } from 'express';
import { update_safety_report_controller } from '../../../controllers';
import { IUpdateSafetyReport } from '../../../interfaces';
const updateSafetyReportRouter: Router = Router();

updateSafetyReportRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: IUpdateSafetyReport = req.body;

        if (!field || !field.id || !field.user_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
        }
        const result = await update_safety_report_controller(field);
        if (!result.success) {
            return res.status(200).json({
                success: false,
                message: `${result?.message}`,
            });
        }
        return res.status(202).json({
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server message: ${error?.message}`,
        });
    }
});

export default updateSafetyReportRouter;
