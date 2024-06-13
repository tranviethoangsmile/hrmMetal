import { Request, Response, Router } from 'express';
import { login } from '../../controllers/login/login.controller';
import { login_data } from '../../interfaces/login/login.interface';

const loginRouter: Router = Router();

loginRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user: login_data = req.body;
        if (!user || !user.password || !user.user_name) {
            throw new Error('bad request');
        }
        const token = await login(user);
        if (token?.success) {
            res.status(201).send({
                success: true,
                data: token?.data,
                token: token?.token,
            });
        } else {
            res.status(203).send({
                success: false,
                message: token?.message,
            });
        }
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

export default loginRouter;
