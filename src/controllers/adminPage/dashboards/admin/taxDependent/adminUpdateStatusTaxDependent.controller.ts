import { Request, Response } from "express";
import { updateTaxDependentStatusWithIdUseCase, CREATE_LOGS_USECASE } from "../../../../../useCases";
import { errorResponse, successResponse } from "../../../../../helpers";
import { IUpdateTaxDependentStatus, IAuditLogsCreate } from "../../../../../interfaces";
const UPDATE_STATUS_TAX_DEPENDENT_CONTROLLER = async (req: Request, res: Response) => {
    try {
        const updateStatusValue: IUpdateTaxDependentStatus = req.body;

        const result = await updateTaxDependentStatusWithIdUseCase(updateStatusValue);
        if (!result?.success) {
            return errorResponse(res, 400, result?.message);
        }

        const log: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'UPDATE',
            resource_type: 'TAX_DEPENDENT',
            resource_id: `${updateStatusValue.id}`,
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
        return successResponse(res, 200);
    } catch (error: any) {
        return errorResponse(res, 500, error.message);
    }
}

export { UPDATE_STATUS_TAX_DEPENDENT_CONTROLLER };