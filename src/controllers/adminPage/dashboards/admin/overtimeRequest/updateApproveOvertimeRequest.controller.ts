import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../../../../../helpers';
import {
    CREATE_LOGS_USECASE,
    update_approved_admin_overtime_request_usecase,
} from '../../../../../useCases';
import { IAuditLogsCreate } from '../../../../../interfaces';

const UPDATE_APPROVE_OVERTIME_REQUEST_BY_ADMIN_CONTROLLER = async (
    req: Request,
    res: Response
) => {
    try {
        const id: string = req.body.id;

        const result = await update_approved_admin_overtime_request_usecase(id);
        if (!result?.success) {
            return errorResponse(res, 400, `${result?.message}`);
        }
        const log: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'UPDATE',
            resource_type: 'OVERTIME REQUEST',
            resource_id: id,
            old_value: null,
            new_value: null,
        };
        try {
            const write_log = await CREATE_LOGS_USECASE(log);
            if (write_log?.success) {
                console.log(`write log success`);
            } else {
                console.log(`write log failed: ${write_log?.message}`);
            }
        } catch (error: any) {
            console.log(`${error?.message}`);
        }
        return successResponse(res, 200);
    } catch (error: any) {
        return errorResponse(
            res,
            500,
            `Internal server error: ${error?.message}`
        );
    }
};

export default UPDATE_APPROVE_OVERTIME_REQUEST_BY_ADMIN_CONTROLLER;
