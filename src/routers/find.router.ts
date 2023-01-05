import express, { Request, Response, Router } from 'express';
import { findByName } from '../controllers/user.controller';

const findRouter = Router();

findRouter.get('/:name', async (req, res) => {
    try {
        const name = req.params.name;
        console.log('name',name);
        if (name) {
            const data = await findByName(name);
            console.log('data',data);
            console.log(data);
            if (!data?.error) {
                res.status(200).send(data?.data);
            } else {
                res.status(400).json({ message: 'Invalid Data' });
            }
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error: trying get user by name ',
        };
    }
})

export default findRouter;