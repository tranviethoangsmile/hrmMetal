import { Request, Response, Router } from 'express';
import { search_payroll_by_id_controller } from '../../../controllers/payroll/payroll.controller';

const searchPayrollByIdRouter: Router = Router();

searchPayrollByIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (id === undefined) {
            return res
                .status(400)
                .json({ success: false, message: 'id is required' });
        }
        const payroll = await search_payroll_by_id_controller(id);
        if (!payroll?.success) {
            return res.status(200).json({
                success: false,
                message: payroll?.message,
            });
        }
        return res.status(202).json({
            success: true,
            data: payroll?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error?.message}`,
        });
    }
});

export default searchPayrollByIdRouter;
