import { Request, Response, Router } from 'express';
import { create, update, destroy, findById, findAll } from '../../controllers';
import { CreateField, UpdateField } from '../../interfaces';
import { errorResponse, successResponse } from '../../helpers';
import uploadAvatar from './userRouterModul/uploadRouterModul';
import findUser from './userRouterModul/findAllUserWithField';
import getUserWithDepartmentId from './userRouterModul/getUserWithDepartmentId';
import userFindByNameRouter from './userRouterModul/findByName';
import getAllUserForOtRequestFeatureRouter from './getAllUserForOtRequestFeature/getAllUserForOtRequestFeature.router';

const userRouters: Router = Router();
userRouters.use('/getuserwithdepartmentid', getUserWithDepartmentId);
userRouters.use('/upload-avatar', uploadAvatar);
userRouters.use('/finduserwithfield', findUser);
userRouters.use('/findbyname', userFindByNameRouter);
userRouters.use(
    '/getalluserforotrequestfeature',
    getAllUserForOtRequestFeatureRouter,
);

// add admin id with middleware check role
userRouters.get('/', async (req: Request, res: Response) => {
    try {
        const users = await findAll();
        if (!users?.success) {
            return errorResponse(res, 400, users?.message || 'Failed to get users');
        } 
        return successResponse(res, 200, users?.data);
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
            !user.role ||
            !user.travel_allowance_pay || 
            !user.shift_night_pay ||
            !user.salary_hourly ||
            !user.paid_days ||
            !user.is_officer ||
            !user.is_offical_staff

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
                !user.paid_days && 'paid_days',
                !user.travel_allowance_pay && 'travel_allowance_pay',
                !user.shift_night_pay && 'shift_night_pay',
                !user.is_offical_staff && 'is_offical_staff',
                !user.salary_hourly && 'salary_hourly',
                !user.is_officer && 'is_officer',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        const data = await create(user);
        if (!data?.success) {
            return errorResponse(res, 200, data?.message || 'Failed to create user');
        }
        return successResponse(res, 201, data?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

userRouters.put('/', async (req: Request, res: Response) => {
    try {
        const value_update: UpdateField = req.body;
        if(!value_update?.id) {
            return errorResponse(res, 400, 'bad request' )
        }
        const result = await update(value_update);
        if(!result?.success){
            return errorResponse(res, 200, result?.message || 'Failed to update user')
        }
        return successResponse(res, 202)
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
            return errorResponse(res, 200, data?.message || 'Failed to delete user');
        }
        return successResponse(res, 202, undefined, data?.message || 'User deleted successfully');
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
            return errorResponse(res, 200, data?.message || 'User not found');
        }
        return successResponse(res, 202, data?.data);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default userRouters;
