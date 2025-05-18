import { Request, Response, Router } from 'express';
import { createDep } from '../../../controllers';
import { CREATE_DEPARETMENT } from '../../../interfaces';

const createDepRouter: Router = Router();

createDepRouter.post('/', async (req: Request, res: Response) => {
    try {
        const value: CREATE_DEPARETMENT = req.body;
        if (!value || !value.name) {
            return res.status(400).json({
                success: false,
                message: 'name is required',
            });
        }
        const department = await createDep(value);
        if (!department?.success) {
            return res.status(200).json({
                success: false,
                message: department?.message,
            });
        }
        return res.status(201).json({
            success: true,
            data: department?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error:: ${error.message}`,
        });
    }
});

export default createDepRouter;
