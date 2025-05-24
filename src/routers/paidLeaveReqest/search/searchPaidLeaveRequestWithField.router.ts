import { Request, Response, Router } from 'express';
import { search_leave_request_with_field_controller } from '../../../controllers';
import { ISearchPaidLeave } from '../../../interfaces';
const searchLeaveRouter: Router = Router();

searchLeaveRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: ISearchPaidLeave = req.body;
        if (!field) {
            return res.status(400).json({
                success: false,
                message: `Missing values`,
            });
        }
        const leaves = await search_leave_request_with_field_controller(field);
        if (leaves?.success) {
            res.status(202).json({
                success: true,
                data: leaves?.data,
            });
        } else {
            res.status(200).json({
                success: false,
                message: leaves?.message,
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
