import { Request, Response, Router } from 'express';
import { create_fcm_token_controller } from '../../../controllers';
import { create_fcm_token } from '../../../interfaces';
import { errorResponse, successResponse } from '../../../helpers';

const createFcm: Router = Router();

createFcm.post('/', async (req: Request, res: Response) => {
    try {
        const field: create_fcm_token | undefined = req.body;
        const missingFields = [];
        if (!field?.app_version) missingFields.push('app_version');
        if (!field?.device_id) missingFields.push('device_id');
        if (!field?.device_type) missingFields.push('device_type');
        if (!field?.fcm_token) missingFields.push('fcm_token');
        if (!field?.user_id) missingFields.push('user_id');
        if (missingFields.length > 0) {
            return errorResponse(res, 400, `Missing required fields: ${missingFields.join(', ')}`);
        }

        const fcm = await create_fcm_token_controller(field);
        if (!fcm?.success) {
            return errorResponse(res, 400, fcm?.message || 'Failed to create FCM token');
        }
        return successResponse(res, 201);
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default createFcm;
