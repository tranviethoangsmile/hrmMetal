import express, { Request, Response, Router } from 'express';
import {
    create,
    update,
    destroy,
    findById,
    findAll,
} from '../controllers/user.controller';
const userRouters: Router = express.Router();

userRouters.get('/', async (req: Request, res: Response) => {
    try {
        const users = await findAll();
        if (users?.success) {
            res.status(201).send({
                success: true,
                data: users?.data,
            });
        } else {
            res.status(200).send({
                success: false,
                message: users?.message,
            });
        }
    } catch (error: any) {
        return res.status(500).send({
            success: false,
            message: 'server error: ' + error.mesage,
        });
    }
});

userRouters.post('/', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        if (user != null) {
            const data = await create(user);
            if (data?.success) {
                res.status(201).send({
                    success: true,
                    data: data?.data,
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: data?.message,
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'data not empty',
            });
        }
    } catch (error: any) {
        return {
            success: false,
            message: 'server error: ' + error.message,
        };
    }
});

userRouters.put('/', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        if (user != null) {
            const data = await update(user);
            if (data?.success) {
                res.status(201).send({
                    success: true,
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: data?.message,
                });
            }
        } else {
            res.status(400).send({
                success: false,
                message: 'data update not empty',
            });
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'server error' + error.massage,
        });
    }
});

userRouters.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (id != null) {
            const data = await destroy(id);
            if (data?.success) {
                res.status(201).send({
                    success: true,
                    message: 'deleted',
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: 'delete failed',
                });
            }
        } else {
            res.status(200).json({
                success: false,
                message: 'id not empty',
            });
        }
    } catch (error: any) {
        return {
            success: true,
            message: 'server error: ' + error.massage,
        };
    }
});

userRouters.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (id) {
            const data = await findById(id);
            if (data?.success) {
                res.status(201).send({
                    success: true,
                    data: data?.data,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: data?.message,
                });
            }
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + error.message,
        });
    }
});

export default userRouters;
