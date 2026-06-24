import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../helpers';
import { login_data } from '../../interfaces';
import { login_user } from '../../useCases';


const app_login_controller = async (req: Request, res: Response) => {
    try {
        const appRoles = ['STAFF', 'LEADER', 'SUPERVISOR', 'MANAGER'];
        const payload: login_data = req.body;
        if(!payload?.password || !payload?.user_name){
            const missingFields = [
                (!payload?.password || payload.password.trim() === '') && 'password',
                (!payload?.user_name || payload.user_name.trim() === '') && 'user_name',
            ]
            .filter(Boolean)
            .join(', ')
            return errorResponse(res, 400, `bad request: missing field ${missingFields} `)
        }

        const login = await login_user(payload);
        if(!login?.success) {
            return errorResponse(res, 400, `${login?.message}`)
        }
        const role: string = login?.data?.role || ''
        if(!appRoles.includes(role)) {
            return errorResponse(res, 403, 'Not allowed for app');
        }
        return res.status(200).json({
            success: true,
            data: login?.data,
            token: login?.token
        }) 
    } catch (error: any) {
        return errorResponse(res, 500, `Internal server error: - ${error?.message} -`)
    }
}



export { app_login_controller };
