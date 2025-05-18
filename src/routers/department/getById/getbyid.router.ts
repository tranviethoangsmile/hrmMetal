import { Request, Response, Router } from 'express';
import { getDepartmentById } from '../../../controllers';
const getDepByIdRouter: Router = Router();
getDepByIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { id }: { id: string } = req.body;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'id is required',
            });
        }
        const department = await getDepartmentById(id);
        if (department?.success) {
            return res.status(202).send({
                success: true,
                data: department?.data,
            });
        } else {
            return res.status(200).send({
                success: false,
                message: department?.message,
            });
        }
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});
export default getDepByIdRouter;
