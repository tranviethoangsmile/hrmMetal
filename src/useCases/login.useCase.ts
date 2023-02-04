import { login } from '../repositorys/login.repository';
import { login_data } from '../interfaces/login.interface';
import { validate_login } from '../helper/login.validate.helper';

const login_user = async (user: login_data) => {
    try {
        const valid = await validate_login(user);
        if (!valid.error) {
            const login_data = await login(user);
            if (login_data?.success) {
                return {
                    success: true,
                    data: login_data?.data,
                    token: login_data?.token,
                };
            } else {
                return {
                    success: false,
                    message: login_data?.message,
                };
            }
        } else {
            return {
                success: false,
                message: valid?.error.message,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

export { login_user };
