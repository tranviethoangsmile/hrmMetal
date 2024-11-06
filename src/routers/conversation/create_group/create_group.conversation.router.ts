import { Router, Request, Response } from 'express';
import { create_conversation_group_controller } from '../../../controllers';
import { create_conversation_group_interface as create } from '../../../interfaces';
const createGroupMessageRouter: Router = Router();

createGroupMessageRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data: create | undefined = req.body;
        if (
            !data ||
            typeof data?.title !== 'string' ||
            typeof data?.sender_id !== 'string'
        ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (!Array.isArray(data?.receivers) || data?.receivers.length < 2) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const conversation = await create_conversation_group_controller(data);
        if (!conversation?.success) {
            return res.status(200).json({
                success: false,
                message: conversation?.message,
            });
        }
        return res.status(201).json({
            success: true,
            conversation_id: conversation?.data?.conversation_id,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `--server error-- ${error?.message}`,
        });
    }
});
export default createGroupMessageRouter;
