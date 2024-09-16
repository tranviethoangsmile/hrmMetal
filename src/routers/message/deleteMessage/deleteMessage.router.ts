import { Request, Response, Router } from 'express';
import { create_delete_message_cotroller } from '../../../controllers';
import { create_delete_message } from '../../../interfaces';

const deleteMessageRouter: Router = Router();

deleteMessageRouter.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_delete_message | undefined = req.body;
        if (!field || !field?.message_id || !field.user_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const result = await create_delete_message_cotroller(field);
        if (!result?.success) {
            return res
                .status(200)
                .json({ success: false, message: `${result?.message}` });
        }
        return res
            .status(201)
            .json({ success: true, message: 'Message deleted successfully' });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error.message}`,
        });
    }
});

export default deleteMessageRouter;
