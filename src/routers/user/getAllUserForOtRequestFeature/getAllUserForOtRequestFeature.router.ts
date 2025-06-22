import { Router, Request, Response } from 'express';
import { getAllUserForOtRequestFeatureControll } from '../../../controllers';

const getAllUserForOtRequestFeatureRouter: Router = Router();

getAllUserForOtRequestFeatureRouter.post(
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
            const users = await getAllUserForOtRequestFeatureControll(id);
            if (users?.success) {
                return res.status(202).json({
                    success: true,
                    data: users?.data,
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: users?.message,
                });
            }
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: `server error: ${error?.message}`,
            });
        }
    },
);

export default getAllUserForOtRequestFeatureRouter;
