import { login_data } from '../../interfaces/login/login.interface';
import { validate_login } from '../../validates/login/login.validate';
import { create_notification_usecase } from '../../useCases';
import { LoginRepository } from '../../repositorys';
const loginRepository = new LoginRepository();
const login_user = async (user: login_data) => {
    try {
        const valid = validate_login(user);
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const login_data = await loginRepository.login(user);
        if (!login_data?.success) {
            throw new Error(`${login_data?.message}`);
        }
        try {
            const field_notification = {
                title: 'login',
                user_id: login_data?.data?.id,
                type: 'SUCCESS',
                message: 'login success',
            };
            const notification = await create_notification_usecase(
                field_notification,
            );
            if (!notification?.success) {
                throw new Error(notification?.message);
            }
        } catch (error: any) {
            console.log(`notification: ${error?.message}`);
        }
        return {
            success: true,
            data: login_data?.data,
            token: login_data?.token,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { login_user };
