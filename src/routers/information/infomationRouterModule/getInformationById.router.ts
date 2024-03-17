import { Request, Response, Router } from 'express';
import { search_information_by_id_controller } from '../../../controllers/information/information.controller';

const getInformationByIdRouter: Router = Router();

getInformationByIdRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body?.id;
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Missing parameter: id',
            });
        } else {
            const information = await search_information_by_id_controller(id);
            if (!information?.success) {
                res.status(200).json({
                    success: information?.success,
                    message: information?.message,
                });
            } else {
                res.status(201).json({
                    success: information?.success,
                    data: information?.data,
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

export default getInformationByIdRouter;
