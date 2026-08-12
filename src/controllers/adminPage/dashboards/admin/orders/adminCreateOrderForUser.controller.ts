import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../../../../helpers";
import { create_order, IAuditLogsCreate } from "../../../../../interfaces";
import { create_order_usecase, CREATE_LOGS_USECASE } from "../../../../../useCases";
const CREATE_ORDER_FOR_ADMIN_CONTROLLER = async (req: Request, res: Response) => {
    try {
        const order_field: create_order = {
            ...req.body,
            position: req.user?.position
        }
        const created_order =  await create_order_usecase(order_field);
        if(!created_order?.success) {
            return errorResponse(res, 400, `${created_order?.message}`);
        }
        const log: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'CREATE',
            resource_type: 'ORDER',
            resource_id: `${created_order?.data?.id}`,
            old_value: null,
            new_value: {
                ...created_order?.data
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
        return successResponse(res, 201, created_order?.data)

    } catch (error: any) {
        return errorResponse(res, 500, `server error:: - ${error?.message} -`)
    }
}

export { CREATE_ORDER_FOR_ADMIN_CONTROLLER };