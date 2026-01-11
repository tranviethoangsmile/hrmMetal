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
import { UpdateField, CreateField } from '../../interfaces';
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
const userFindAllWithFieldUse = async (field: any) => {
    try {
        const isValid = valid_user_find_all_with_field(field);
        if (isValid.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const users = await userRepository.userFindAllWithFieldRepo(field);
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

const updateUser = async (user: any) => {
    try {
        console.log(user);
        const valid = valid_user_update(user);
        console.log(valid.error?.message);
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        if (user.password) {
            const passBcrypt = await bcrypt.hash(user.password, 10);
            const userBcrypted: UpdateField = {
                ...user,
                password: passBcrypt,
            };
            const new_user = await userRepository.userUpdate(userBcrypted);
            if (!new_user?.success) {
                throw new Error(`${new_user?.message}`);
            }
            return {
                success: true,
            };
        } else {
            const user_updated: UpdateField = {
                ...user,
            };
            const new_user = await userRepository.userUpdate(user_updated);
            if (!new_user?.success) {
                throw new Error(`${new_user?.message}`);
            }
            return {
                success: true,
            };
        }
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
    getUserByIdUseCase
};
