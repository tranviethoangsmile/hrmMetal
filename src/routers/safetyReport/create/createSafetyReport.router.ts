import { Router, Request, Response } from 'express';
import { create_safety_report_controller } from '../../../controllers';
import { ICreateSafetyReport } from '../../../interfaces';
import { create_media_path } from '../../../middlewares';
import { errorResponse, successResponse } from '../../../helpers';
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
                return errorResponse(res, 400, `Missing required ${missingFields}`);
            }

            const result = await create_safety_report_controller(field);
            if (!result.success) {
                return errorResponse(res, 400, result?.message || 'Failed to create safety report');
            }
            return successResponse(res, 201, result?.data);
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    },
);
export default createSafetyReportRouter;
