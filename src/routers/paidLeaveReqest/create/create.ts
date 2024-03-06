import { Request, Response, Router } from 'express';
import { create } from '../../../controllers/paidLeaveRequest/paidLeaveRequest.controller';
const create_router: Router = Router();

create_router.post('/', async (req: Request, res: Response) => {
    try {
        const data: Object | null = req.body;
        console.log(data);
        if (data === null || typeof data !== 'object') {
            return res.status(400).json({
                success: false,
                message: 'Data do not empty',
            });
        } else {
            const result = await create(data);
            if (!result?.success) {
                res.status(200).json({
                    success: false,
                    message: result?.message,
                });
            } else {
                res.status(201).json({
                    success: true,
                    data: result?.data,
                });
            }
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Sever Error ' + error.message,
        });
    }
});

export default create_router;
