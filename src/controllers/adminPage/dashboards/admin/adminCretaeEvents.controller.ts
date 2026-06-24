import e, { Request, Response } from "express";
import { successResponse, errorResponse } from "../../../../helpers";
import { create_events_interface } from "../../../../interfaces";
import { create_events_use } from "../../../../useCases";

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
        console.log(payload)
        const event = await create_events_use(payload);
        if(!event?.success) {
            return errorResponse(res, 400, `create event failed: ${event?.message}`)
        }

        return successResponse(res, 201, event?.data)
    } catch (error: any) {
        return errorResponse(res, 500, `Internal server error: ${error?.message}`)
    }
}

export { CREATE_EVENTS_FOR_ADMIN_CONTROLLER }