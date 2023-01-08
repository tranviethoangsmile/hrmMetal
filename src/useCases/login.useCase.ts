import { login } from "../repositorys/login.repository";
import { login_data } from '../interfaces/login.interface'
import { validate_login } from "../helper/login.validate.helper";

const login_user = async (user: login_data ) => {
    try {
        const valid = await validate_login(user);
        if(!valid.error) {
            const login_data = await login(user);
            if(login_data?.success) {
                return {
                    success: true,
                    user: login_data?.data,
                    token: login_data?.token
                }
            }else {
                return {
                    success: false,
                    message: login_data?.message
                }
            }
        }else {
            return {
                success: false,
                message: 'Data login not valid'
            }
        }
        
    } catch (error) {
        return {
            success: false,
        }
    }
}

export { login_user }