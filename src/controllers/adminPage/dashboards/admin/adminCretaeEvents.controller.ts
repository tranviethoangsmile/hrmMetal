import e, { Request, Response } from "express";
import { successResponse, errorResponse } from "../../../../helpers";
import { create_events_use, CREATE_LOGS_USECASE } from "../../../../useCases";
import { create_events_interface, IAuditLogsCreate } from "../../../../interfaces";

const CREATE_EVENTS_FOR_ADMIN_CONTROLLER = async (req: Request, res: Response) => {
    try {
        const { media_path, ...rest } = req.body;
        const payload: create_events_interface = {
            ...rest,
            position: req.user?.position
        }
        if(media_path){
            payload.media =  media_path
        }
        if (
            !payload ||
            !payload.name ||
            !payload.description ||
            !payload.date_end ||
            !payload.date_start ||
            !payload.position
        ) {
            const missingpayloads = [
                (!payload.name || payload.name.trim() === '') && 'name',
                (!payload.description || payload.description.trim() === '') && 'description',
                (!payload.date_end || payload.date_end.trim() === '') && 'date_end',
                (!payload.date_start || payload.date_start.trim() === '') && 'date_start',
                (!payload.position || payload.position.trim() === '') && 'position',
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Invalid input: Missing required ${missingpayloads}`);
        }
        const created_event = await create_events_use(payload);
        if(!created_event?.success) {
            return errorResponse(res, 400, `create event failed: ${created_event?.message}`)
        }
        const log: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'CREATE',
            resource_type: 'EVENTS',
            resource_id: `${created_event?.data?.id}`,
            old_value: null,
            new_value: {
                ...created_event?.data
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
        return successResponse(res, 201, created_event?.data)
    } catch (error: any) {
        return errorResponse(res, 500, `Internal server error: ${error?.message}`)
    }
}

export { CREATE_EVENTS_FOR_ADMIN_CONTROLLER }