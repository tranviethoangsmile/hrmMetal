import bcrypt from 'bcrypt';
import {
    validation_id,
    valid_user_create,
    valid_user_update,
    valid_user_find_all_with_field,
    valid_find_by_name,
} from '../../validates';
import { Role, Position } from '../../enum';
import { getDepartmentById } from '../../controllers';
import { CreateField } from '../../interfaces';
import { setCache, getCache, delCache } from '../../utils';
import { UserRepository } from '../../repositorys';
const userRepository = new UserRepository();

const getAllUserForOtRequestFeatureUse = async (id: string) => {
    try {
        const valid_id = validation_id(id);
        if (valid_id?.error) {
            throw new Error(`${valid_id?.error.message}`);
        }
        const users = await userRepository.GET_ALL_USER_FOR_OT_REQUEST_FEATURE(
            id,
        );
        if (!users?.success) {
            throw new Error(`${users?.message}`);
        }
        return {
            success: users?.success,
            data: users?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `useCase :: ${error?.message}`,
        };
    }
};
const getUserForLeaveFeatureUse = async (id: any) => {
    try {
        const valid_id = validation_id(id);
        if (valid_id?.error) {
            throw new Error(`${valid_id?.error.message}`);
        }
        const listUser = await userRepository.getUserForLeaveFeatureRepo(id);
        if (!listUser?.success) {
            throw new Error(`${listUser?.message}`);
        }
        return {
            success: listUser?.success,
            data: listUser?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
const get_all_users_of_position_for_admin_use = async (position: string) => {
    try {
        if (
            typeof position !== 'string' ||
            !Object.values(Position).includes(position as Position)
        ) {
            throw new Error('User position not available');
        }
        const users = await userRepository.GET_ALL_USERS_OF_POSITION_FOR_ADMIN(position);
        if (!users?.success) {
            throw new Error(`${users?.message}`);
        }
        return {
            success: true,
            data: users?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `useCase :: ${error?.message}`,
        };
    }
};
const USER_FILTER_FIELDS = ['position', 'department_id', 'role', 'employee_id', 'name'];

const userFindAllWithFieldUse = async (field: any) => {
    try {
        const isValid = valid_user_find_all_with_field(field);
        if (isValid.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const where: any = { is_active: true };
        for (const key of USER_FILTER_FIELDS) {
            if (field?.[key] !== undefined && field?.[key] !== null && field?.[key] !== '') {
                where[key] = field[key];
            }
        }
        const users = await userRepository.userFindAllWithFieldRepo(where);
        if (!users?.success) {
            throw new Error(`${users?.message}`);
        }
        return {
            success: true,
            data: users.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
const createNewUser = async (user: any) => {
    try {
        const valid = valid_user_create(user);
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        if (
            typeof user.role !== 'string' ||
            !Object.values(Role).includes(user.role)
        ) {
            throw new Error('User create failed -- Role not available');
        }

        if (
            typeof user.position !== 'string' ||
            !Object.values(Position).includes(user.position)
        ) {
            throw new Error('User create failed -- Position not available');
        }
        const department = await getDepartmentById(user.department_id);
        if (!department?.success) {
            throw new Error(`${department?.message}`);
        }
        const passBcrypt = await bcrypt.hash(user.password, 10);
        const userBcrypted: CreateField = {
            ...user,
            password: passBcrypt,
        };
        const new_user = await userRepository.userCreate(userBcrypted);
        if (!new_user?.success) {
            throw new Error(`${new_user?.message}`);
        }
        await delCache('ALL_USER');
        return {
            success: true,
            data: new_user?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const SELF_UPDATABLE_FIELDS = [
    'name',
    'user_name',
    'email',
    'dob',
    'phone',
    'avatar',
    'ic_id',
    'password',
];

const ADMIN_UPDATABLE_FIELDS = [
    'name',
    'user_name',
    'email',
    'password',
    'dob',
    'phone',
    'avatar',
    'ic_id',
    'employee_id',
    'is_active',
    'is_admin',
    'is_officer',
    'role',
    'position',
    'department_id',
    'begin_date',
    'is_offical_staff',
    'salary_hourly',
    'shift_night_pay',
    'travel_allowance_pay',
    'paid_days',
];

const updateUser = async (user: any, actor: any) => {
    try {
        const valid = valid_user_update(user);
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const targetId = user?.id;
        const isAdmin = actor?.role === 'ADMIN';
        if (!isAdmin && actor?.id !== targetId) {
            throw new Error(`You can only update your own profile`);
        }

        const allowedFields = isAdmin
            ? ADMIN_UPDATABLE_FIELDS
            : SELF_UPDATABLE_FIELDS;
        const sanitized: any = {};
        for (const key of allowedFields) {
            if (user[key] !== undefined) {
                sanitized[key] = user[key];
            }
        }
        if (Object.keys(sanitized).length < 1) {
            throw new Error(`no updatable fields provided`);
        }
        if (sanitized.password) {
            sanitized.password = await bcrypt.hash(sanitized.password, 10);
        }
        const new_user = await userRepository.userUpdate({ ...sanitized, id: targetId });
        if (!new_user?.success) {
            throw new Error(`${new_user?.message}`);
        }
        await delCache('ALL_USER');
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const deleteUser = async (id: string) => {
    try {
        const valid_id = validation_id(id);
        if (valid_id.error) {
            throw new Error(`${valid_id?.error.message}`);
        }
        const user = await userRepository.userFindById(id);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }
        const deleted_user = await userRepository.userDelete(id);
        if (!deleted_user?.success) {
            throw new Error(`${deleted_user?.message}`);
        }
        return {
            success: true,
            message: deleted_user?.message,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const findUserById = async (userId: string) => {
    try {
        const valid_id = validation_id(userId);
        if (valid_id.error) {
            throw new Error(`${valid_id?.error.message}`);
        }
        const user = await userRepository.userFindById(userId);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }
        return {
            success: true,
            data: user?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const findUserByName = async (name: string) => {
    try {
        const isValid = valid_find_by_name(name);
        if (isValid?.error) {
            throw new Error(isValid?.error.message);
        }
        const user = await userRepository.userFindByName(name);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }
        return {
            success: true,
            data: user?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const findAllUser = async () => {
    try {
        const VALUE_CACHE = await getCache('ALL_USER');
        if (VALUE_CACHE) {
            return {
                success: true,
                data: JSON.parse(VALUE_CACHE),
            };
        }
        const users = await userRepository.userFindAll();
        if (!users?.success) {
            throw new Error(`${users?.message}`);
        }
        await setCache('ALL_USER', JSON.stringify(users.data), 1);
        return {
            success: true,
            data: users.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const getUserByIdUseCase = async (id: string) =>{
    try {
        const valid_id = validation_id(id);
        if (valid_id.error) {
            throw new Error(`${valid_id?.error.message}`);
        }
        const user = await userRepository.GET_USER_BY_ID(id);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }
        return {
            success: true,
            data: user?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        }; 
    }
}

export {
    createNewUser,
    updateUser,
    deleteUser,
    findUserById,
    findUserByName,
    findAllUser,
    userFindAllWithFieldUse,
    getUserForLeaveFeatureUse,
    getAllUserForOtRequestFeatureUse,
    getUserByIdUseCase,
    get_all_users_of_position_for_admin_use,
};
