import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../../../../helpers";
import { create_notification_usecase, CREATE_LOGS_USECASE } from "../../../../../useCases";
import { IAuditLogsCreate, create_notification_interface } from "../../../../../interfaces";

const CREATE_NOTIFICATION_FOR_ADMIN_CONTROLLER = async (req: Request, res: Response) => {
    try {
        const payload: create_notification_interface = req.body;
        const created_notification = await create_notification_usecase(payload)
        if(!created_notification?.success) {
            return errorResponse(res, 400, `${created_notification?.message}`)
        }
        const log: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'CREATE',
            resource_type: 'NOTIFICATION',
            resource_id: `${created_notification?.data?.id}`,
            old_value: null,
            new_value: {
                type: created_notification?.data?.type,
                title: created_notification?.data?.title
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
        return successResponse(res, 201, created_notification?.data)
    } catch (error: any) {
        return errorResponse(res, 500, `server error:: - ${error?.message} -`)
    }
}

export { CREATE_NOTIFICATION_FOR_ADMIN_CONTROLLER }