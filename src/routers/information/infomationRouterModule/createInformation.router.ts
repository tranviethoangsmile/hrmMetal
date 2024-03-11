import { Request, Response, Router } from 'express';
import { create_information_controller } from '../../../controllers/information/information.controller';
import { create_media_path } from '../../../middlewares/createTrainning.middleware';
import very_role from '../../../middlewares/veryRoleUpdate.middleware';
const createInformationRouter: Router = Router();

createInformationRouter.post(
    '/',
    very_role,
    async (req: Request, res: Response) => {
        try {
            const value = req.body;
            if (!value) {
                res.status(400).json({
                    success: false,
                    message: 'value not empty',
                });
            } else {
                const information = await create_information_controller(
                    req.body,
                );
                if (information?.success) {
                    res.status(201).json({
                        success: true,
                        date: information?.data,
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        message: information?.message,
                    });
                }
            }
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Server error: ' + error?.message,
            });
        }
    },
);

export default createInformationRouter;
