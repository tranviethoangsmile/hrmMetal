import { Request, Response, Router } from 'express';
import { create_fcm_token_controller } from '../../../controllers';
import { create_fcm_token } from '../../../interfaces';

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
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`,
            });
        }

        const fcm = await create_fcm_token_controller(field);
        console.log(fcm);
        if (!fcm?.success) {
            return res.status(200).json({
                success: false,
                message: `${fcm?.message}`,
            });
        }
        return res.status(201).json({
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `Internal server error`,
        });
    }
});

export default createFcm;
