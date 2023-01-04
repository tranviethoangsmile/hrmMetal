import { userCreate, userUpdate } from '../repositorys/user.repository';
import { valid_user_create, valid_user_update } from '../helper/user.validate.helper'
import { User } from '../models'
import  bcrypt  from 'bcrypt'

const createNewUser = async (user: User) => {
        const valid = valid_user_create(user)
        console.log(valid)
        if (!valid.error) {
            const passBcrypt = await bcrypt.hash(user.password, 10)
            const userBcrypted = {
                ...user,
                password: passBcrypt
            }
            const new_user = await userCreate(userBcrypted)
            if(new_user) {
                return new_user
            }else {
                return {
                    error: true,
                    message: 'User create faild'
                }
            }
        }else {
            return {
                error: true,
                message: 'data error',
            };
        }
};

const updateUser = async (user: User) => {
    try {
        const valid = valid_user_update(user)
        console.log(valid);
        if (!valid.error) {
            if(user.password) {
                const passBcrypt = await bcrypt.hash(user.password, 10)
                const userBcrypted = {
                   ...user,
                   password: passBcrypt
                }
                const new_user = await userUpdate(userBcrypted)
                if(new_user) {
                    return new_user
                }else {
                    return {
                        error: true,
                        message: 'User update faild'
                    }
                }
            }
        }else {
            return {
                error: true,
                message: 'data error',
            };
        }
    } catch (error) {
        return {
            error: true,
            message: 'User can\'t update ',
        }
    }
       
}

export { createNewUser, updateUser }