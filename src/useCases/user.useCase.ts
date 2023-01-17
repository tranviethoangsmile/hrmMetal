import bcrypt from 'bcrypt';
import {
    userCreate,
    userUpdate,
    userDelete,
    userFindById,
    userFindByName,
    userFindAll
} from '../repositorys/user.repository';
import {
    valid_user_create,
    valid_user_update,
} from '../helper/user.validate.helper';
import { User } from '../models';
import { validation_id } from '../helper';
import { Role } from '../enum/Role.enum';
import { Position } from '../enum/Position.enum';
const createNewUser = async (user: User) => {
    const valid = valid_user_create(user);
    if (!valid.error) {
        if(typeof user.role === 'string' && Object.values(Role).includes(user.role) && typeof user.position === 'string' && Object.values(Position).includes(user.position)) {
            const passBcrypt = await bcrypt.hash(user.password, 10);
            const userBcrypted = {
                ...user,
                password: passBcrypt,
            };
            const new_user = await userCreate(userBcrypted);
            if (new_user) {
                return new_user;
            } else {
                return {
                    error: true,
                    message: 'User create faild',
                };
            }
        }else {
            return {
                error: true,
                message: 'User create failed Role or Position not available', 
            }
        }
        
      
    } else {
        return {
            error: true,
            message: valid.error.message,
        };
    }
};

const updateUser = async (user: User) => {
    try {
        const valid = valid_user_update(user);
        console.log(valid);
        if (!valid.error) {
            if (user.password) {
                const passBcrypt = await bcrypt.hash(user.password, 10);
                const userBcrypted = {
                    ...user,
                    password: passBcrypt,
                };
                const new_user = await userUpdate(userBcrypted);
                if (new_user.toString() === '1') {
                    return {
                        error: false,
                        message: 'User updated',
                    }
                } else {
                    return {
                        error: true,
                        message: 'User update faild',
                    };
                }
            }
        } else {
            return {
                error: true,
                message: 'data error',
            };
        }
    } catch (error) {
        return {
            error: true,
            message: "User can't update ",
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
                if (deleted_user === 1) {
                    return {
                        error: false,
                        message: 'User deleted',
                    };
                } else {
                    return {
                        error: true,
                        message: 'User delete faild',
                    };
                }
            } else {
                return {
                    error: true,
                    message: 'user not exist',
                };
            }
        } else {
            return {
                error: true,
                message: 'id wrong...!!',
            };
        }
    } catch (error) {
        return {
            error: true,
            message: 'User delete error ',
        };
    }
};

const findUserById = async (userId: string) => {
    try {
        const valid_id = validation_id(userId);
        if (!valid_id.error) {
            const user = await userFindById(userId);
            console.log('usercase',user)
            if (user) {
                return {
                    error: false,
                    data: user,
                };
            } else {
                return {
                    error: true,
                    message: 'User not found',
                };
            }
        } else {
            return {
                error: true,
                message: 'id wrong...!!',
            };
        }
    } catch (error) {
        return {
            error: true,
            message: 'id not valid',
        };
    }
};

const findUserByName = async (name: string) => {
    try {
        if (name !== '') {
            const user = await userFindByName(name);
            if (user) {
                return {
                    error: false,
                    data: user,
                };
            }else {
                return {
                    error: true,
                    message: 'User not found',
                };
            }
        }else {
            return {
                error: true,
                message: 'name wrong...!!',
            };
        }
    } catch (error) {
        return {
            error: true,
            message: 'User not found',
        }
    }
}

const findAllUser = async () => {
    try {
        const users = await userFindAll();
        if(users?.success) {
            return {
                error: false,
                data: users.data,
            }
        }else {
            return {
                error: true,
                message: users?.message,
            };
        }
    } catch (error) {
        return {
            error: true,
            message: 'User find wrong...!',
        }
    }
   }


export { createNewUser, updateUser, deleteUser, findUserById, findUserByName, findAllUser };
