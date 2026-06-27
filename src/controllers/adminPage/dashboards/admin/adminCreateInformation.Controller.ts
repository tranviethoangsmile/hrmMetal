import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../../../helpers";
import { create_information, IAuditLogsCreate } from "../../../../interfaces";
import { CREATE_LOGS_USECASE, create_information_use } from "../../../../useCases";
const CREATE_INFORMATION_FOR_ADMIN_CONTROLLER = async (req: Request, res: Response) => {
    try {
        const {media_path, ...rest} = req.body;

        const payload: create_information = {
            ...rest,
            user_id: req.user?.id,
            position: req.user?.position
        }
        if(media_path) {
            payload.media = media_path;
        }

        const created_information = await create_information_use(payload);

        if(!created_information?.success) {
            return errorResponse(res, 400, `${created_information?.message}`);
        }
        const log: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'CREATE',
            resource_type: 'INFORMATION',
            resource_id: `${created_information?.data?.id}`,
            old_value: null,
            new_value: {
                ...created_information?.data
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
        
        return successResponse(res, 201, created_information?.data)

    } catch (error: any) {
        return errorResponse(res, 500, `Internal server error: ${error?.message}`)
    }
}

export { CREATE_INFORMATION_FOR_ADMIN_CONTROLLER }