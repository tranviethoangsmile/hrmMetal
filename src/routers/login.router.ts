import { Request, Response, Router } from 'express';
import { login } from '../controllers/login.controller';

const loginRouter = Router();

loginRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const token = await login(user);
        if(token?.success) {
            res.status(200).send(token?.data);
        }else {
            res.status(404).send(token?.message);
        }
    } catch (error) {
        res.status(500).send({
            message: 'server error',
        });
    }
});

export default loginRouter;
