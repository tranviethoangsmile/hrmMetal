import express, { Request, Response, Router } from 'express';
import {
    create,
    update,
    destroy,
    findById,
    findAll
} from '../controllers/user.controller';
const userRouters: Router = express.Router();

userRouters.get('/', async (req: Request, res: Response) => {
   try {
    const users = await findAll();
    if (!users?.error) {
        res.status(200).send(users?.data)
    }else {
        res.status(500).send(users?.message)
    }
   } catch (error) {
        return res.status(500).send({
            error: error,
            message: 'Server error'
        })
   }
});

userRouters.post('/', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        if (user) {
            const data = await create(user);
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
            const data = await update(user);
            if (data) {
                res.status(201).send(data);
            } else {
                res.status(400).json({ message: 'Invalid Data' });
            }
        }
    } catch (error) {
        return {
            message: 'Error: trying update user ',
        };
    }
});

userRouters.post('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (id) {
            const data = await destroy(id);
            if (!data.error) {
                res.status(201).send(data);
            } else {
                res.status(400).json({ message: 'Invalid Data' });
            }
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error: trying delete user ',
        };
    }
});

userRouters.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (id) {
            const data = await findById(id);
            if (!data?.error) {
                res.status(200).send(data?.data);
            } else {
                res.status(400).json({ message: 'Invalid Data' });
            }
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error: trying get user by id ',
        };
    }
});

export default userRouters;
