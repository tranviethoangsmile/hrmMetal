import { Request, Response, Router } from 'express';
import { get_overtime_request_by_id_controller } from '../../../controllers';
const getOvertimeRequestByIdRouter: Router = Router();
getOvertimeRequestByIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: 'ID is required' });
        }
        const response = await get_overtime_request_by_id_controller(id);
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
export default getOvertimeRequestByIdRouter;
