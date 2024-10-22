import { Request, Response, Router } from 'express';
import { update_uniform_order_controller } from '../../../controllers';
import { update_uniform_order } from '../../../interfaces';
const updateUniformOrderRouter: Router = Router();

updateUniformOrderRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: update_uniform_order | undefined = req.body;
        if (!field || !field.id) {
            return res.status(400).json({
                success: false,
                message: `bad request`,
            });
        }

        const result = await update_uniform_order_controller({
            ...field,
        });

        if (!result?.success) {
            return res.status(200).json({
                success: false,
                message: `${result?.message}`,
            });
        }
        return res.status(202).json({
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `Server -- ${error?.message}`,
        });
    }
});

export default updateUniformOrderRouter;
