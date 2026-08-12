import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../../../../../helpers';
import {
    IAuditLogsCreate,
    ICreateOvertimeRequest,
} from '../../../../../interfaces';
import {
    create_overtime_request_usecase,
    CREATE_LOGS_USECASE,
} from '../../../../../useCases';

const CREATE_OVERTIME_REQUEST_BY_LEADER_CONTROLLER = async (
    req: Request,
    res: Response
) => {
    try {
        const payload_create: ICreateOvertimeRequest = {
            ...req.body,
            leader_id: req.user?.id,
            department_id: req.user?.department_id,
        };

        const created_ot = await create_overtime_request_usecase(
            payload_create
        );
        if (!created_ot?.success) {
            return errorResponse(res, 400, `${created_ot?.message}`);
        }
        const log: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'CREATE',
            resource_type: 'OVERTIME REQUEST',
            resource_id: `${created_ot?.data?.id}`,
            old_value: null,
            new_value: {
                name: `${created_ot?.data?.description}`,
            },
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
        return successResponse(res, 201, created_ot?.data);
    } catch (error: any) {
        return errorResponse(res, 500, `server error:: - ${error?.message} -`);
    }
};

export default CREATE_OVERTIME_REQUEST_BY_LEADER_CONTROLLER;
