import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../helpers';
import {
    search_information_of_user_use,
    search_information_by_id_use,
    search_all_information_with_field_use,
} from '../../useCases';
const search_information_user_controller = async (id: any) => {
    return await search_information_of_user_use(id);
};
const search_information_by_id_controller = async (id: any) => {
    return await search_information_by_id_use(id);
};
const search_all_information_with_field_controller = async (field: any) => {
    return await search_all_information_with_field_use(field);
};

const GET_ALL_INFORMATION_WITH_FIELD_CONTROLLER = async (req: Request, res: Response) => {
    try {
        const POSITION: string | undefined = req.user?.position;
        if (!POSITION) {
            return errorResponse(res, 400, 'Missing position');
        }
        const informations = await search_all_information_with_field_use(POSITION);
        if (informations?.success) {
            return successResponse(res, 200, informations?.data);
        } else {
            return errorResponse(res, 400, informations?.message || 'Failed to search information');
        }
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
};
export {
    search_information_user_controller,
    search_information_by_id_controller,
    search_all_information_with_field_controller,
    GET_ALL_INFORMATION_WITH_FIELD_CONTROLLER,
};
