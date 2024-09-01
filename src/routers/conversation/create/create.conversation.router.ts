import { Router, Request, Response } from 'express';
import { create_conversation_controller } from '../../../controllers';
import { io } from '../../../socket/socketIO';
import { create_conversation_interface as create } from '../../../interfaces';
const createConversationRouter: Router = Router();

createConversationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const responseData: create | undefined = req.body;
        if (
            !responseData ||
            !responseData?.receiver_id ||
            !responseData?.sender_id
        ) {
            res.status(400).json({
                success: true,
                message: 'data not empty',
            });
        } else {
            const value = await create_conversation_controller(responseData);
            if (value?.success) {
                res.status(201).json({
                    success: value?.success,
                    data: value?.data,
                });
            } else {
                res.status(200).json({
                    success: value?.success,
                    meessage: value?.message,
                });
            }
        }
    } catch (e: any) {
        res.status(500).send({
            success: false,
            message: 'Server error: ' + e?.message,
        });
    }
});

export default createConversationRouter;
