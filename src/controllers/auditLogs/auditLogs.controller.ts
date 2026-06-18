import { Request, Response } from "express";
import { SEARCH_LOGS_USECASE } from "../../useCases";
import { successResponse, errorResponse } from "../../helpers";
import { IAuditLogSearchInput } from "../../interfaces";
const SEARCH_LOGS_CONTROLLER = async (req: Request, res: Response) => {
    try {
        const inputValue: IAuditLogSearchInput = req.body;
        if(!inputValue){
            errorResponse(res, 400, `bad request`)
        }
        const result_search = await SEARCH_LOGS_USECASE(inputValue);
        if(!result_search?.success){
            return errorResponse(res, 400, `${result_search?.message}`);
        }
        return successResponse(res, 200, result_search?.data)
    } catch (error: any) {
        return errorResponse(res, 500, `server error: ${error?.message}`)
    }
}

export { SEARCH_LOGS_CONTROLLER }