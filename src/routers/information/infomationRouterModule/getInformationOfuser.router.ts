import { Request, Response, Router } from 'express';
import { search_information_user_controller } from '../../../controllers/information/information.controller';
const getInforOfUserRouter: Router = Router();
getInforOfUserRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user_id: string | undefined = req.body?.user_id;
        if (!user_id) {
            res.status(400).json({ message: 'Missing parameter' });
        } else {
            const informations = await search_information_user_controller(
                user_id,
            );
            if (informations?.success) {
                res.status(201).json({
                    success: informations?.success,
                    data: informations?.data,
                });
            } else {
                res.status(200).json({
                    success: informations?.success,
                    message: informations?.message,
                });
            }
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error?.message,
        });
    }
});

export default getInforOfUserRouter;
