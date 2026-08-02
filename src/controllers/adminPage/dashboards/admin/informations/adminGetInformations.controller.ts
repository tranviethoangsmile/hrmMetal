import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../../../../helpers";
import { search_information_of_user_use } from "../../../../../useCases";

const GET_INFORMATIONS_BY_ADMIN_ID_CONTROLLER = async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req?.user?.id;
        if (!id) {
            return errorResponse(res, 400, 'Missing parameter: id');
        }
        const informations = await search_information_of_user_use(id);
        if (!informations?.success) {
            return errorResponse(res, 400, informations?.message || 'Failed to get information');
        }
        return successResponse(res, 200, informations?.data);
    } catch (error: any) {
        return errorResponse(res, 500, `Internal server error: ${error?.message}`)
    }
}

export { GET_INFORMATIONS_BY_ADMIN_ID_CONTROLLER };
