import { Request, Response, Router } from 'express';
import { get_all_overtime_request_controller } from '../../../controllers';

const getAllOvertimeRequestRouter: Router = Router();
getAllOvertimeRequestRouter.post('/', async (req: Request, res: Response) => {
    try {
        const response = await get_all_overtime_request_controller();
        if (!response.success) {
            return res
                .status(200)
                .json({ success: false, message: response.message });
        }
        return res.status(202).json({ success: true, data: response.data });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Internal server error' });
    }
});
export default getAllOvertimeRequestRouter;
