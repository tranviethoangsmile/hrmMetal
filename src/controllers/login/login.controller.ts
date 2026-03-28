import { login_user } from '../../useCases';

const login = async (user: any) => {
    return await login_user(user);
};

export { login };
