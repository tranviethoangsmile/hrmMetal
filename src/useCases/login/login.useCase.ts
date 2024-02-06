import { login } from '../../repositorys/login/login.repository';
import { login_data } from '../../interfaces/login/login.interface';
import { validate_login } from '../../validates/login/login.validate';

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
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { login_user };
