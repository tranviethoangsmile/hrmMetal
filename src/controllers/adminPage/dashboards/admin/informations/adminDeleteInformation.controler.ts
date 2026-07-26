import { Request, Response } from "express";
import { IAuditLogsCreate } from "../../../../../interfaces";
import { CREATE_LOGS_USECASE } from "../../../../../useCases";
import { delete_information_by_id_use } from "../../../../../useCases";
import { errorResponse, successResponse } from "../../../../../helpers";
const ADMIN_DELETE_INFORMATION_CONTROLLER = async (req: Request, res: Response) => {
    try {
        const  id: string = req.body.id;
        const result = await delete_information_by_id_use(id);
        if (!result.success) {
            return errorResponse(res, 400, `${result?.message}`);
        }
        const log: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'DELETE',
            resource_type: 'INFORMATION',
            resource_id: `${id}`,
            old_value: null,
            new_value: null
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
        return successResponse(res, 200, {
            message: 'Information deleted successfully'
        });
    } catch (error) {
        return errorResponse(res, 500, "Internal server error");
    }
}

export { ADMIN_DELETE_INFORMATION_CONTROLLER };