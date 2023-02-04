import { Request, Response, Router } from 'express';
import { login } from '../controllers/login.controller';

const loginRouter = Router();

loginRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        if (user != null) {
            const token = await login(user);
            if (token?.success) {
                res.status(201).send({
                    success: true,
                    data: token?.data,
                    token: token?.token,
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: token?.message,
                });
            }
        } else {
            res.status(400).send({
                success: false,
                message: 'data not empty',
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + error,
        });
    }
});

export default loginRouter;
