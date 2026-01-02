import { Request, Response, Router } from 'express';
import { login } from '../../controllers/login/login.controller';
import { login_data } from '../../interfaces/login/login.interface';
import { errorResponse, successResponse } from '../../helpers';

const loginRouter: Router = Router();

loginRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user: login_data = req.body;
        if (!user || !user.password || !user.user_name) {
            const missingFields = [
                !user.password && 'password',
                !user.user_name && 'user_name',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Missing values: ${missingFields}`);
        }
        const token = await login(user);
        if (token?.success) {
            // Login có token riêng, cần custom response
            return res.status(202).json({
                success: true,
                data: token?.data,
                token: token?.token,
            });
        } else {
            return errorResponse(res, 401, token?.message || 'Login failed');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default loginRouter;
