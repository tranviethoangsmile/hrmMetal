import { Request, Response, Router } from 'express';
import {
    create,
    update,
    destroy,
    findById,
    findAll,
} from '../../controllers/user/user.controller';
import uploadAvatar from './userRouterModul/uploadRouterModul';
import findUser from './userRouterModul/findAllUserWithField';
import getUserWithDepartmentId from './userRouterModul/getUserWithDepartmentId';
import userFindByNameRouter from './userRouterModul/findByName';
import { CreateField } from '../../interfaces/user/user.interface';
const userRouters: Router = Router();
userRouters.use('/getuserwithdepartmentid', getUserWithDepartmentId);
userRouters.use('/upload-avatar', uploadAvatar);
userRouters.use('/finduserwithfield', findUser);
userRouters.use('/findbyname', userFindByNameRouter);
userRouters.get('/', async (req: Request, res: Response) => {
    try {
        const users = await findAll();
        if (users?.success) {
            res.status(200).send({
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
        const user: CreateField = req.body;

        if (
            !user ||
            !user.name ||
            !user.email ||
            !user.user_name ||
            !user.password ||
            !user.dob ||
            !user.employee_id ||
            !user.department_id ||
            !user.role
        ) {
            const missingFields = [
                !user.name && 'name',
                !user.email && 'email',
                !user.user_name && 'user_name',
                !user.password && 'password',
                !user.dob && 'dob',
                !user.employee_id && 'employee_id',
                !user.department_id && 'department_id',
                !user.role && 'role',
            ]
                .filter(Boolean)
                .join(', ');
            return res.status(400).json({
                success: false,
                message: `bad request :: Invalid input: Missing required ${missingFields}`,
            });
        }
        if (
            user.salary_hourly === undefined &&
            user.travel_allowance_pay === undefined &&
            user.shift_night_pay === undefined &&
            user.paid_days === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: `bad request:: Invalid input: Missing required fields`,
            });
        }
        const data = await create(user);
        if (data?.success) {
            return res.status(201).send({
                success: true,
                data: data?.data,
            });
        } else {
            return res.status(200).send({
                success: false,
                message: data?.message,
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server message: ${error?.message}`,
        });
    }
});

userRouters.put('/', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        if (user != null) {
            const data = await update(user);
            if (data?.success) {
                res.status(202).send({
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
        const id: string | undefined = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'id not empty',
            });
        }
        const data = await destroy(id);
        if (!data?.success) {
            return res.status(200).json({
                success: false,
                message: data?.message,
            });
        }
        return res.status(202).send({
            success: true,
            message: data?.message,
        });
    } catch (error: any) {
        return {
            success: true,
            message: 'server error: ' + error.massage,
        };
    }
});

userRouters.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'id not empty',
            });
        }
        const data = await findById(id);
        if (!data?.success) {
            return res.status(200).json({
                success: false,
                message: data?.message,
            });
        }
        return res.status(202).send({
            success: true,
            data: data?.data,
        });
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + error.message,
        });
    }
});

export default userRouters;
