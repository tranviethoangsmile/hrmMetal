import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../../../../../helpers";
import { departmentCreate, CREATE_LOGS_USECASE } from "../../../../../../useCases";
import { CREATE_DEPARETMENT, IAuditLogsCreate } from "../../../../../../interfaces";


const ADMIN_CREATE_DEPARTMENT_CONTROLLER = async (req: Request, res: Response) => {
    try {
        const payload: CREATE_DEPARETMENT = req.body;
        const created_department = await departmentCreate(payload);
        if(!created_department?.success) {
            return errorResponse(res, 400, `${created_department?.message}`);
        }
        const log: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'CREATE',
            resource_type: 'DEPARTMENTS',
            resource_id: `${created_department?.data?.id}`,
            old_value: null,
            new_value: {
                name: `${created_department?.data?.name}`
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

        return successResponse(res, 201, created_department?.data);
    } catch (error: any) {
        return errorResponse(res, 500, `Internal server error: ${error?.message}`)
    }
}

export { ADMIN_CREATE_DEPARTMENT_CONTROLLER };