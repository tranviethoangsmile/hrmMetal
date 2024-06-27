import { Request, Response, Router } from 'express';
import { destroy_payroll_controller } from '../../../controllers/payroll/payroll.controller';

const destroyPayrollRouter: Router = Router();

destroyPayrollRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id;
        if (typeof id !== 'string') {
            return res
                .status(400)
                .json({ success: false, message: 'id is not a string' });
        }
        const result = await destroy_payroll_controller(id);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result?.message,
            });
        }
        return res.status(202).json({ success: true });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error:  ${error?.message}`,
        });
    }
});
export default destroyPayrollRouter;
