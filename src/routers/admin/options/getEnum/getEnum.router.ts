import { Router, Request, Response } from 'express';
import { getEnumForAdminControler } from '../../../../controllers';
import { successResponse, errorResponse } from '../../../../helpers';
const getEnumRouter: Router = Router();

getEnumRouter.get('/', async (req: Request, res: Response) => {
    try {
        const enums = await getEnumForAdminControler();
        if (!enums?.success) {
            return errorResponse(res, 400, `${enums?.message}`);
        }
        return successResponse(res, 200, enums?.data);
    } catch (error: any) {
        return errorResponse(
            res,
            500,
            error?.message || 'Internal server error'
        );
    }
});

export default getEnumRouter;
