import { Router, Request, Response } from 'express';
import { create_conversation_controller } from '../../../controllers';
import { io } from '../../../socket/socketIO';
import { create_conversation_interface as create } from '../../../interfaces';
const createConversationRouter: Router = Router();

createConversationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const reqData: create | undefined = req.body;
        if (!reqData || !reqData?.receiver_id || !reqData?.sender_id) {
            return res.status(400).json({
                success: true,
                message: 'data not empty',
            });
        }
        const value = await create_conversation_controller(reqData);
        if (value?.success) {
            return res.status(201).json({
                success: value?.success,
                data: value?.data,
            });
        } else {
            return res.status(200).json({
                success: value?.success,
                meessage: value?.message,
            });
        }
    } catch (e: any) {
        return res.status(500).send({
            success: false,
            message: 'Server error: ' + e?.message,
        });
    }
});

export default createConversationRouter;
