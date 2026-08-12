import { Request, Response, Router } from 'express';
import { findAllUserWithFieldControll } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';
import { FindAllField } from '../../../interfaces';

const findUser: Router = Router();

findUser.post('/', async (req: Request, res: Response) => {
    try {
        const field: FindAllField = req.body;
        if(!field){
            return errorResponse(res, 400, 'data is required')
        }
        const users = await findAllUserWithFieldControll(field);
        if(!users?.success){
            return errorResponse(res, 200, users?.message)
        }
        return successResponse(res, 202, users?.data)
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default findUser;
