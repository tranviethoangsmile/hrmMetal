import { Request, Response } from "express";
import { Role } from "../../../../../enum";
import { successResponse, errorResponse } from "../../../../../helpers";
import { CreateField, IAuditLogsCreate } from "../../../../../interfaces";
import { createNewUser, CREATE_LOGS_USECASE } from "../../../../../useCases";
const CREATE_USER_FOR_ADMIN_CONTROLLER = async (req: Request, res: Response) => {
    try {
        const user: CreateField = {
            ...req.body,
            position: req?.user?.position
        }
        if(req?.user?.role.trim() === Role.ADMIN && user.role.trim() === Role.ADMIN) {
            return errorResponse(res, 403, `You do not have permission for this action` )
        }
        const created_user = await createNewUser(user);
        if(!created_user?.success){
            return errorResponse(res, 400, `${created_user?.message}`)
        }
        const log: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'CREATE',
            resource_type: 'USER',
            resource_id: `${created_user?.data?.id}`,
            old_value: null,
            new_value: {
                id:          created_user?.data?.id,
                name:        created_user?.data?.name,
                employee_id: created_user?.data?.employee_id,
                role:        created_user?.data?.role,
                position:    created_user?.data?.position,
            }
        }
        try {
            const write_log = await CREATE_LOGS_USECASE(log);
            if(write_log?.success){
                console.log(`write log success`)
            }else {
                console.log(`write log failed: ${write_log?.message}`)
            }
        } catch (error: any) {
            console.log(`${error?.message}`)
        }
        return successResponse(res, 201, created_user?.data);
    } catch (error: any) {
        return errorResponse(res, 500, `server error:: ${error?.message}`)
    }
}

export { CREATE_USER_FOR_ADMIN_CONTROLLER };