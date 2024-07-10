import { Request, Response, Router } from 'express';
import { search_all_information_with_field_controller } from '../../../controllers/information/information.controller';
const searchAllRouter: Router = Router();

searchAllRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field = req.body.field;
        if (!field) {
            return res.status(400).json({
                success: false,
                message: 'Missing field',
            });
        } else {
            const informations =
                await search_all_information_with_field_controller(field);
            if (informations?.success) {
                return res.status(202).json({
                    success: informations?.success,
                    data: informations?.data,
                });
            } else {
                return res.status(200).json({
                    success: informations?.success,
                    message: informations?.message,
                });
            }
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Server error: ' + error?.message,
        });
    }
});

export default searchAllRouter;
