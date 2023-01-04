import express, { Request, Response, Router } from 'express';
import { createUser, userUpdate } from '../controllers/user.controller';
const userRouters: Router = express.Router();

userRouters.get('/', (req: Request, res: Response) => {
    res.send('users!');
});

userRouters.post('/', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        if (user) {
            const data = await createUser(user);
            if (data) {
                res.status(201).send(data);
            } else {
                res.status(400).json({ message: 'Invalid Data' });
            }
        } else {
            res.status(400).json({ message: 'data not valid' });
        }
    } catch (error) {
        return {
            message: 'Error: trying create user ',
        };
    }
});

userRouters.put('/', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        if (user) {
            const data = await userUpdate(user);
            if (data) {
                res.status(201).send(data);
            }else {
                res.status(400).json({ message: 'Invalid Data' });
            }
        }
    } catch (error) {
        return {
            message: 'Error: trying update user ',
        };
    }
});

export default userRouters;
