import { Router, Request, Response } from 'express';
import { delete_conversation_controller } from '../../../controllers';
import { create_delete_conversation } from '../../../interfaces';

const destroyConversationRouter: Router = Router();

destroyConversationRouter.delete('/', async (req: Request, res: Response) => {
    try {
        const field: create_delete_conversation | undefined = req.body;
        if (!field || !field?.conversation_id || !field?.user_id) {
            return res.status(400).json({
                success: false,
                message: `bad request`,
            });
        }
        const dlConversation = await delete_conversation_controller(field);
        if (!dlConversation?.success) {
            return res.status(200).json({
                success: false,
                message: `${dlConversation?.message}`,
            });
        }
        return res.status(201).json({
            success: true,
            data: dlConversation?.data,
        });
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: `server error: ${error?.meessage}`,
        });
    }
});

export default destroyConversationRouter;
