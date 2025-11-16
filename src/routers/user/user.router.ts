import { Request, Response, Router } from 'express';
import { create, update, destroy, findById, findAll } from '../../controllers';
import uploadAvatar from './userRouterModul/uploadRouterModul';
import findUser from './userRouterModul/findAllUserWithField';
import getUserWithDepartmentId from './userRouterModul/getUserWithDepartmentId';
import userFindByNameRouter from './userRouterModul/findByName';
import { CreateField } from '../../interfaces/user/user.interface';
import getAllUserForOtRequestFeatureRouter from './getAllUserForOtRequestFeature/getAllUserForOtRequestFeature.router';
import { errorResponse, successResponse } from '../../helpers';

const userRouters: Router = Router();
userRouters.use('/getuserwithdepartmentid', getUserWithDepartmentId);
userRouters.use('/upload-avatar', uploadAvatar);
userRouters.use('/finduserwithfield', findUser);
userRouters.use('/findbyname', userFindByNameRouter);
userRouters.use(
    '/getalluserforotrequestfeature',
    getAllUserForOtRequestFeatureRouter,
);
userRouters.get('/', async (req: Request, res: Response) => {
    try {
        const users = await findAll();
        if (users?.success) {
            return successResponse(res, 200, users?.data);
        } else {
            return errorResponse(res, 400, users?.message || 'Failed to get users');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
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
            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        if (
            user.salary_hourly === undefined &&
            user.travel_allowance_pay === undefined &&
            user.shift_night_pay === undefined &&
            user.paid_days === undefined
        ) {
            return errorResponse(res, 400, 'Invalid input: Missing required fields');
        }
        const data = await create(user);
        if (data?.success) {
            return successResponse(res, 201, data?.data);
        } else {
            return errorResponse(res, 400, data?.message || 'Failed to create user');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

userRouters.put('/', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        if (user != null) {
            const data = await update(user);
            if (data?.success) {
                return successResponse(res, 200, undefined, 'User updated successfully');
            } else {
                return errorResponse(res, 400, data?.message || 'Failed to update user');
            }
        } else {
            return errorResponse(res, 400, 'data update not empty');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

userRouters.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.params.id;
        if (!id) {
            return errorResponse(res, 400, 'id is required');
        }
        const data = await destroy(id);
        if (!data?.success) {
            return errorResponse(res, 400, data?.message || 'Failed to delete user');
        }
        return successResponse(res, 200, undefined, data?.message || 'User deleted successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

userRouters.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.params.id;
        if (!id) {
            return errorResponse(res, 400, 'id is required');
        }
        const data = await findById(id);
        if (!data?.success) {
            return errorResponse(res, 404, data?.message || 'User not found');
        }
        return successResponse(res, 200, data?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default userRouters;
