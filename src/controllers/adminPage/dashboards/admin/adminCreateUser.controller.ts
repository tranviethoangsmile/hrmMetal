import { Request, Response } from "express";
import { CreateField } from "../../../../interfaces";
import { successResponse, errorResponse } from "../../../../helpers";
import { createNewUser, CREATE_LOGS_USECASE } from "../../../../useCases";
import { Role } from "../../../../enum";
import { IAuditLogsCreate } from "../../../../interfaces";
const CREATE_USER_FOR_ADMIN_CONTROLLER = async (req: Request, res: Response) => {
    try {
        const user: CreateField = {
            ...req.body,
            position: req?.user?.position
        }
        if (
            !user ||
            !user.name ||
            !user.email ||
            !user.user_name ||
            !user.password ||
            !user.dob ||
            !user.employee_id ||
            !user.department_id ||
            !user.role ||
            !user.travel_allowance_pay || 
            !user.shift_night_pay ||
            !user.salary_hourly ||
            !user.paid_days||
            !user.position 

        ) {
            const missingFields = [
                !user.name && 'name',
                !user.email && 'email',
                !user.user_name && 'user_name',
                !user.password && 'password',
                !user.dob && 'dob',
                !user.employee_id && 'employee_id',
                !user.department_id && 'department_id',
                !user.role && 'role',
                !user.paid_days && 'paid_days',
                !user.travel_allowance_pay && 'travel_allowance_pay',
                !user.shift_night_pay && 'shift_night_pay',
                !user.salary_hourly && 'salary_hourly',
                !user.position && 'position'
            ]
                .filter(Boolean)
                .join(', ');
            return errorResponse(res, 400, `Invalid input: Missing required ${missingFields}`);
        }

        if(req?.user?.role.trim() === Role.ADMIN && user.role.trim() === Role.ADMIN) {
            return errorResponse(res, 403, `You do not have permission for this action` )
        }

        const created_user = await createNewUser(user);
        if(!created_user?.success){
            return errorResponse(res, 400, `${created_user?.message}`)
        }
        const log: IAuditLogsCreate = {
            actor_id: `${req?.user?.id}`,
            actor_name: `${req?.user?.name}`,
            action: 'CREATE',
            resource_type: 'USER',
            resource_id: `${created_user?.data?.id}`,
            old_value: null,
            new_value: {
                ...created_user?.data
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
        return successResponse(res, 201, created_user?.data);
    } catch (error: any) {
        return errorResponse(res, 500, `server error:: ${error?.message}`)
    }
}

export { CREATE_USER_FOR_ADMIN_CONTROLLER };