import { Router, Request, Response } from 'express';
import { get_all_safety_report_by_department_id_controller } from '../../../controllers';
const getByDepartmentIdRouter: Router = Router();

getByDepartmentIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const departmentId: string = req.body.id;

        if (!departmentId) {
            return res.status(400).json({
                success: false,
                message: 'Department ID is required',
            });
        }

        const safetyReports =
            await get_all_safety_report_by_department_id_controller(
                departmentId,
            );
        if (!safetyReports?.success) {
            return res.status(200).json({
                success: false,
                message: safetyReports?.message,
            });
        }
        return res.status(202).json({
            success: true,
            data: safetyReports.data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

export default getByDepartmentIdRouter;
