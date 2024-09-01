import { Request, Response, Router } from 'express';
import { create_message_controller } from '../../../controllers';
import { create_new_message } from '../../../interfaces';
const createMessageRouter: Router = Router();

createMessageRouter.post('/', async (req: Request, res: Response) => {
    try {
        const mess: create_new_message | undefined = req.body;
        if (!mess || !mess.conversation_id || !mess.message || !mess.user_id) {
            return res.status(400).json({
                success: false,
                message: 'data not empty',
            });
        }
        const new_mess = await create_message_controller(mess);
        if (new_mess?.success) {
            return res.status(201).json({
                success: true,
                data: new_mess?.data,
            });
        } else {
            return res.status(200).json({
                success: false,
                message: new_mess?.message,
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

export default createMessageRouter;
