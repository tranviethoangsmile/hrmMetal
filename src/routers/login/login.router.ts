import { Request, Response, Router } from 'express';
import { login } from '../../controllers/login/login.controller';
import { login_data } from '../../interfaces/login/login.interface';

const loginRouter: Router = Router();

loginRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user: login_data = req.body;
        if (!user || !user.password || !user.user_name) {
            return res.status(400).send({
                success: false,
                message: 'bad request',
            });
        }
        const token = await login(user);
        if (token?.success) {
            return res.status(202).send({
                success: true,
                data: token?.data,
                token: token?.token,
            });
        } else {
            return res.status(200).send({
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
