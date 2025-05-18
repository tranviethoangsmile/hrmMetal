import { Request, Response, Router } from 'express';
import { departmentList } from '../../../controllers';
const getAllDepRouter: Router = Router();

getAllDepRouter.get('/', async (req: Request, res: Response) => {
    try {
        const departments = await departmentList();
        if (departments?.success) {
            return res.status(202).send({
                success: true,
                data: departments?.data,
            });
        } else {
            return res.status(200).send({
                success: false,
                message: departments?.message,
            });
        }
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

export default getAllDepRouter;
