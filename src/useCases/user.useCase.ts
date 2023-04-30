import bcrypt from 'bcrypt';
import {
    userCreate,
    userUpdate,
    userDelete,
    userFindById,
    userFindByName,
    userFindAll,
} from '../repositorys/user.repository';
import {
    valid_user_create,
    valid_user_update,
} from '../validates/user.validate';
import { validation_id } from '../validates';
import { Role } from '../enum/Role.enum';
import { Position } from '../enum/Position.enum';
import { getDepartmentById } from '../controllers/department.controller';
import { UpdateField, CreateField } from '../interfaces/user.interface';
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
                    const new_user = await userCreate(userBcrypted);
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
                const new_user = await userUpdate(userBcrypted);
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
        if (!valid_id.error) {
            const user = await userFindById(id);
            if (user) {
                const deleted_user = await userDelete(id);
                if (deleted_user?.data === 1) {
                    return {
                        success: true,
                        message: 'User deleted',
                    };
                } else {
                    return {
                        success: false,
                        message: 'User delete faild',
                    };
                }
            } else {
                return {
                    success: false,
                    message: 'user not exist',
                };
            }
        } else {
            return {
                success: false,
                message: 'id wrong...!!',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const findUserById = async (userId: string) => {
    try {
        const valid_id = validation_id(userId);
        if (!valid_id.error) {
            const user = await userFindById(userId);
            if (user?.success) {
                return {
                    success: true,
                    data: user,
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
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const findUserByName = async (name: string) => {
    try {
        if (name !== '') {
            const user = await userFindByName(name);
            if (user) {
                return {
                    success: true,
                    data: user,
                };
            } else {
                return {
                    success: false,
                    message: 'User not found',
                };
            }
        } else {
            return {
                success: true,
                message: 'name not empty',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const findAllUser = async () => {
    try {
        const users = await userFindAll();
        if (users?.success) {
            return {
                success: true,
                data: users.data,
            };
        } else {
            return {
                success: false,
                message: users?.message,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
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
};
