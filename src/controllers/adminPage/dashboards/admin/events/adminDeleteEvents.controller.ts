import { Request, Response } from "express";
import { IAuditLogsCreate } from "../../../../../interfaces";
import { successResponse, errorResponse } from "../../../../../helpers";
import { delete_events_use, CREATE_LOGS_USECASE } from "../../../../../useCases";

const DELETE_EVENTS_FOR_ADMIN_CONTROLLER = async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id;
        const result = await delete_events_use(id);
        if(!result?.success) {
            return errorResponse(res, 400, `${result?.message}`)
        }

        const log: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'DELETE',
            resource_type: 'EVENTS',
            resource_id: `${id}`,
            old_value: null,
            new_value: null,
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
        return successResponse(res, 200)
        
    } catch (error: any) {
        return errorResponse(res, 500, `Internal server error: ${error?.message}`)
    }
}

export { DELETE_EVENTS_FOR_ADMIN_CONTROLLER };