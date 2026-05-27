import { Router, Request, Response } from "express";
import { getEnumForAdminControler } from "../../../../controllers";
import { successResponse, errorResponse } from "../../../../helpers";
import { requireRoles } from "../../../../middlewares";
const getEnumRouter: Router = Router();

getEnumRouter.post('/',requireRoles(['ADMIN']), async (req: Request, res: Response) => {
    try {
        const enums = await getEnumForAdminControler();
        if(!enums?.success){
            return errorResponse(res, 200, `${enums?.message}`)
        }
        return successResponse(res, 202, enums?.data)
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error'); 
    }
})

export default getEnumRouter;
