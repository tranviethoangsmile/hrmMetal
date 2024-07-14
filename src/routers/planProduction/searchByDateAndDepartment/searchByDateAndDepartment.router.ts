import { Request, Response, Router } from 'express';
import { search_plan_production_seven_day_of_department_controller } from '../../../controllers';
import { search_by_date_and_department } from '../../../interfaces';
const searchByDateOfDepartmentRouter: Router = Router();

searchByDateOfDepartmentRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const field: search_by_date_and_department = req.body;
            if (
                !field ||
                !field.department_id ||
                !field.end_date ||
                !field.start_date
            ) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing field',
                });
            }
            const planProductions =
                await search_plan_production_seven_day_of_department_controller(
                    field,
                );

            if (!planProductions?.success) {
                return res.status(200).json({
                    success: false,
                    message: planProductions?.message,
                });
            }
            return res.status(202).json({
                success: true,
                data: planProductions?.data,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: `server error: ${error.message}`,
            });
        }
    },
);

export default searchByDateOfDepartmentRouter;
