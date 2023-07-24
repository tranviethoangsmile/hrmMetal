import { Request, Response, Router } from 'express';
import { create } from '../controllers/message.controller';
const messageRouter = Router();

messageRouter.post('/', async (req: Request, res: Response) => {
    try {
        const mess = req.body;
        if (mess && Object.keys(mess).length !== 0) {
            const new_mess = await create(mess);
            if (new_mess?.success) {
                res.status(201).json({
                    success: new_mess?.success,
                    data: new_mess?.data,
                });
            } else {
                res.status(200).json({
                    success: new_mess?.success,
                    message: new_mess?.message,
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'data not empty',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});
export default messageRouter;
