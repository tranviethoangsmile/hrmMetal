import { Router, Request, Response } from 'express';
import { create_conversation } from '../../controllers/conversation/conversation.controller';
import { io } from '../../socket/socketIO';
const conversationRouter: Router = Router();

conversationRouter.post('/', async (req: Request, res: Response) => {
    try {
        const responseData = req.body;
        if (responseData && Object.keys(responseData).length === 0) {
            res.status(400).json({
                success: true,
                message: 'data not empty',
            });
        } else {
            const value = await create_conversation(responseData);
            if (value?.success) {
                io.emit('conversationid', value?.data);
                res.status(201).json({
                    success: value?.success,
                    data: value?.data,
                });
            } else {
                io.emit('mess', 'hello');
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

export default conversationRouter;
