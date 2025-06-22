import { Router, Request, Response } from 'express';
import { getAllUserCheckedSafetyCheckEventController } from '../../../controllers';

const getAllUserCheckedSafetyCheckEventRouter: Router = Router();

getAllUserCheckedSafetyCheckEventRouter.post(
    '/',
    async (req: Request, res: Response) => {
        try {
            const id: string = req.body.id;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'id is required',
                });
            }
            const result = await getAllUserCheckedSafetyCheckEventController(
                id,
            );
            if (!result?.success) {
                return res.status(200).json({
                    success: false,
                    message: result?.message,
                });
            }
            return res.status(202).json({
                success: true,
                data: result?.data,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: `server: ${error.message}`,
            });
        }
    },
);

export default getAllUserCheckedSafetyCheckEventRouter;
