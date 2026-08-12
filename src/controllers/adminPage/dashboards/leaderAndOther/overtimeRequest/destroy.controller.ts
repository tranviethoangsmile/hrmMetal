import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../../../../../helpers';
import {
    IAuditLogsCreate,
    IDeleteOvertimeRequest,
} from '../../../../../interfaces';
import {
    CREATE_LOGS_USECASE,
    delete_overtime_request_by_id_usecase,
} from '../../../../../useCases';

const DESTROY_OVERTIME_REQUEST_BY_LEADER_CONTROLLER = async (
    req: Request,
    res: Response
) => {
    try {
        const payload_delete: IDeleteOvertimeRequest = {
            ...req.body,
            leader_id: req.user?.id,
        };
        const result = await delete_overtime_request_by_id_usecase(
            payload_delete
        );
        if (!result?.success) {
            return errorResponse(res, 400, `${result?.message}`);
        }

        const log: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'DELETE',
            resource_type: 'OVERTIME REQUEST',
            resource_id: `${payload_delete?.id}`,
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
        return errorResponse(res, 500, `server error:: - ${error?.message} -`);
    }
};

export default DESTROY_OVERTIME_REQUEST_BY_LEADER_CONTROLLER;
