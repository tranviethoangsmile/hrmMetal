import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../helpers";

const requireRoles = (allowRoles: string[])=>(
    (req: Request, res: Response, next: NextFunction) => {
        const role: string = req.body.role;
        if(!role || !allowRoles.includes(role)){
            return errorResponse(res, 403, `You do not have permission for this action`)
        }
        next();
    }
)

export default requireRoles;