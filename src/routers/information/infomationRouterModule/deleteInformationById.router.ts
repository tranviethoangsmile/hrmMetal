import { Request, Response, Router } from 'express';
import { delete_information_by_id_controller } from '../../../controllers/information/information.controller';
const deleteInformation: Router = Router();
deleteInformation.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body?.id;
        console.log(id);
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Missing parameter: id',
            });
        } else {
            const delete_result = await delete_information_by_id_controller(id);
            if (delete_result?.success) {
                res.status(201).json({
                    success: true,
                });
            } else {
                res.status(200).json({
                    success: false,
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
export default deleteInformation;
