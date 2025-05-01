import { Request, Response, Router } from 'express';
import { create_event_check_controller } from '../../../controllers';
import { create_event_check_interface } from '../../../interfaces';
const createEvenCheck: Router = Router();
createEvenCheck.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_event_check_interface = req.body;
        if (!field || !field.event_id || !field.is_confirm || !field.user_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing field',
            });
        }
        const even_check = await create_event_check_controller(field);
        if (!even_check?.success) {
            return res.status(200).json({
                success: true,
                message: `${even_check?.message}`,
            });
        }
        return res.status(201).json({
            success: true,
            data: even_check?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server: ${error?.message}`,
        });
    }
});
export default createEvenCheck;
