import { Request, Response, Router } from 'express';
import { create_overtime_request_controller } from '../../../controllers';
import { ICreateOvertimeRequest } from '../../../interfaces';

const createOvertimeRequestRouter: Router = Router();

createOvertimeRequestRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data: ICreateOvertimeRequest = req.body;
        if (
            !data ||
            !data.user_id ||
            !data.department_id ||
            !data.leader_id ||
            !data.position ||
            !data.date ||
            !data.overtime_hours ||
            !data.description
        ) {
            const missingFields = [
                !data.user_id && 'user_id',
                !data.date && 'date',
                !data.position && 'position',
                !data.department_id && 'department_id',
                !data.overtime_hours && 'overtime_hours',
                !data.description && 'description',
                !data.leader_id && 'leader_id',
            ]
                .filter(Boolean)
                .join(', ');
            return res.status(400).json({
                success: false,
                message: `Missing values: ${missingFields}`,
            });
        }
        const result = await create_overtime_request_controller(data);
        if (result?.success) {
            return res.status(201).json({
                success: true,
                data: result.data,
            });
        }
        return res.status(400).json({
            success: false,
            message: result?.message,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default createOvertimeRequestRouter;
