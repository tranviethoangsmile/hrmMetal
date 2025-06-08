import { Request, Response, Router } from 'express';
import { delete_information_by_id_controller } from '../../../controllers/information/information.controller';
import delete_media_url from '../../../middlewares/delete_media_url.middleware';
const deleteInformation: Router = Router();
deleteInformation.post(
    '/',
    delete_media_url,
    async (req: Request, res: Response) => {
        try {
            const id: string | undefined = req.body?.id;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing parameter: id',
                });
            } else {
                const delete_result = await delete_information_by_id_controller(
                    id,
                );
                console.log(delete_result);
                if (delete_result?.success) {
                    return res.status(202).json({
                        success: true,
                    });
                } else {
                    return res.status(200).json({
                        success: false,
                    });
                }
            }
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Server error: ' + error?.message,
            });
        }
    },
);
export default deleteInformation;
