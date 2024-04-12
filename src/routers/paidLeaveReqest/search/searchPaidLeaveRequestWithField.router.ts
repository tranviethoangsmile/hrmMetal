import { Request, Response, Router } from 'express';
import { search_leave_request_with_field_controller } from '../../../controllers/paidLeaveRequest/paidLeaveRequest.controller';
const searchLeaveRouter: Router = Router();

searchLeaveRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: object | undefined = req.body;
        if (field != undefined && typeof field === 'object') {
            const leaves = await search_leave_request_with_field_controller(
                field,
            );
            if (leaves?.success) {
                res.status(201).json({
                    success: true,
                    data: leaves?.data,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: leaves?.message,
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'Data do not empty',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Sever Error ' + error.message,
        });
    }
});

export default searchLeaveRouter;
