import { Router, Request, Response } from 'express';
import { confirm_safety_report_controller } from '../../../controllers';
import { IConfirmSafetyReport } from '../../../interfaces';
const confirmSafetyReportRouter: Router = Router();

confirmSafetyReportRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: IConfirmSafetyReport = req.body;

        if (!field || !field.id || !field.leader_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
        }
        const result = await confirm_safety_report_controller(field);
        if (!result?.success) {
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
export default confirmSafetyReportRouter;
