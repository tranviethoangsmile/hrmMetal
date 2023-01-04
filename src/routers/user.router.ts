import express, { Request, Response, NextFunction, Router } from 'express';
import { createUser } from '../controllers/user.controller';
const userRouters: Router = express.Router();

userRouters.get('/', (req, res) => {
    res.send('users!');
});

userRouters.post('/', async (req, res) => {
    const user = req.body;
    const data = await createUser(user);
    if (data) {
        res.status(201).send(data);
    } else {
        res.status(400).json({ message: 'Invalid Data' });
    }
});

export default userRouters;
