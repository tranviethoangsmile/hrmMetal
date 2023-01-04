import { userCreate } from '../repositorys/user.repository';
import { valid_user_create } from '../helper/user.validate.helper'
import { User } from '../models'
import  bcrypt  from 'bcrypt'

const createNewUser = async (user: User) => {
    try {
        const valid = valid_user_create(user)
        if (valid) {
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
        
    } catch (error) {
        return {
            error: true,
            message: 'data error',
        };
    }
   
}

export { createNewUser }