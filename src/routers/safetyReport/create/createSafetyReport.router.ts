import { Router, Request, Response } from 'express';
import { create_safety_report_controller } from '../../../controllers';
import { ICreateSafetyReport } from '../../../interfaces';
import { create_media_path } from '../../../middlewares';
const createSafetyReportRouter: Router = Router();

createSafetyReportRouter.post(
    '/',
    create_media_path,
    async (req: Request, res: Response) => {
        try {
            const field: ICreateSafetyReport = req.body;

            if (
                !field ||
                !field.user_id ||
                !field.title ||
                !field.content ||
                !field.date ||
                !field.department_id ||
                !field.solution
            ) {
                const missingFields = [
                    !field.user_id && 'user_id',
                    !field.title && 'title',
                    !field.content && 'content',
                    !field.date && 'date',
                    !field.department_id && 'department_id',
                    !field.solution && 'solution',
                ]
                    .filter(Boolean)
                    .join(', ');
                return res.status(400).json({
                    success: false,
                    message: `Missing required ${missingFields}`,
                });
            }

            const result = await create_safety_report_controller(field);
            if (!result.success) {
                return res.status(200).json({
                    success: false,
                    message: `${result?.message}`,
                });
            }
            return res.status(201).json({
                success: true,
                data: result?.data,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: `server message: ${error?.message}`,
            });
        }
    },
);
export default createSafetyReportRouter;
