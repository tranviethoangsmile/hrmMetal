import bcrypt from 'bcrypt';
import {
    valid_user_create,
    valid_user_update,
    valid_user_find_all_with_field,
    valid_find_by_name,
} from '../../validates/user/user.validate';
import { validation_id } from '../../validates';
import { Role } from '../../enum/Role.enum';
import { Position } from '../../enum/Position.enum';
import { getDepartmentById } from '../../controllers/department/department.controller';
import {
    UpdateField,
    CreateField,
    FindAllField,
} from '../../interfaces/user/user.interface';

import { UserRepository } from '../../repositorys';
const userRepository = new UserRepository();
const getUserForLeaveFeatureUse = async (id: any) => {
    try {
        const valid_id = validation_id(id);
        if (!valid_id?.error) {
            const listUser = await userRepository.getUserForLeaveFeatureRepo(
                id,
            );
            if (listUser?.success) {
                return {
                    success: listUser?.success,
                    data: listUser?.data,
                };
            } else {
                return {
                    success: listUser?.success,
                    message: listUser?.message,
                };
            }
        } else {
            return {
                success: false,
                message: valid_id?.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
const userFindAllWithFieldUse = async (field: FindAllField) => {
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
        if (!valid.error) {
            if (
                typeof user.role === 'string' &&
                Object.values(Role).includes(user.role) &&
                typeof user.position === 'string' &&
                Object.values(Position).includes(user.position)
            ) {
                const department = await getDepartmentById(user.department_id);
                if (department?.success) {
                    const passBcrypt = await bcrypt.hash(user.password, 10);
                    const userBcrypted: CreateField = {
                        ...user,
                        password: passBcrypt,
                    };
                    const new_user = await userRepository.userCreate(
                        userBcrypted,
                    );
                    if (new_user?.success) {
                        return {
                            success: true,
                            data: new_user?.data,
                        };
                    } else {
                        return {
                            success: false,
                            message: new_user?.message,
                        };
                    }
                } else {
                    return {
                        succsess: false,
                        message: department?.message,
                    };
                }
            } else {
                return {
                    success: false,
                    message:
                        'User create failed Role or Position not available',
                };
            }
        } else {
            return {
                success: false,
                message: valid.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const updateUser = async (user: any) => {
    try {
        const valid = valid_user_update(user);
        if (!valid.error) {
            if (user.password) {
                const passBcrypt = await bcrypt.hash(user.password, 10);
                const userBcrypted: UpdateField = {
                    ...user,
                    password: passBcrypt,
                };
                const new_user = await userRepository.userUpdate(userBcrypted);
                if (new_user?.success) {
                    return {
                        success: true,
                        message: 'User updated',
                    };
                } else {
                    return {
                        success: false,
                        message: new_user?.message,
                    };
                }
            } else {
                const user_updated: UpdateField = {
                    ...user,
                };
                const new_user = await userRepository.userUpdate(user_updated);
                if (new_user?.success) {
                    return {
                        success: true,
                        message: 'User updated',
                    };
                } else {
                    return {
                        success: false,
                        message: new_user?.message,
                    };
                }
            }
        } else {
            return {
                success: false,
                message: valid.error?.message,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
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
        if (!valid_id.error) {
            const user = await userRepository.userFindById(userId);
            if (user?.success) {
                return {
                    success: true,
                    data: user?.data,
                };
            } else {
                return {
                    success: false,
                    message: 'User not found',
                };
            }
        } else {
            return {
                success: false,
                message: valid_id?.error.message,
            };
        }
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
        const users = await userRepository.userFindAll();
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

export {
    createNewUser,
    updateUser,
    deleteUser,
    findUserById,
    findUserByName,
    findAllUser,
    userFindAllWithFieldUse,
    getUserForLeaveFeatureUse,
};
