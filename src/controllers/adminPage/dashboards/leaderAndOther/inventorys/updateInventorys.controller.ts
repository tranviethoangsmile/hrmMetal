import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../../../../../helpers';
import { IAuditLogsCreate, update_inventory } from '../../../../../interfaces';
import {
    update_inventory_use,
    CREATE_LOGS_USECASE,
} from '../../../../../useCases';

const UPDATE_INVENTORY_FOR_LEADER_CONTROLLER = async (
    req: Request,
    res: Response
) => {
    try {
        const payload_update: update_inventory = {
            ...req.body,
            department_id: req?.user?.department_id,
        };
        const updated = await update_inventory_use(payload_update);
        if (!updated?.success) {
            return errorResponse(res, 400, `${updated?.message}`);
        }
        const logs: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'UPDATE',
            resource_type: 'INVENTORY',
            resource_id: `${payload_update.id}`,
            old_value: {
                name: `${payload_update?.product}`,
            },
            new_value: {
                name: `${payload_update?.product}`,
                quantity: payload_update?.quantity,
            },
        };
        try {
            const write_log = await CREATE_LOGS_USECASE(logs);
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

export { UPDATE_INVENTORY_FOR_LEADER_CONTROLLER };
