import { OvertimeRequestRepository } from '../../repositorys';
import { validate_create_overtime_request } from '../../validates';
import { findUserById, getDepById } from '../index';
import { Position, OVERTIME_REQUEST_HOUR } from '../../enum';

const overtimeRequestRepo = new OvertimeRequestRepository();

const create_overtime_request_usecase = async (data: any) => {
    try {
        const isVlalid = validate_create_overtime_request(data);
        if (isVlalid.error) {
            throw new Error(isVlalid.error.message);
        }
        const user = await findUserById(data.user_id);
        if (!user.success) {
            throw new Error(user.message);
        }
        const leader = await findUserById(data?.leader_id);
        if (!leader.success) {
            throw new Error(leader.message);
        }
        const department = await getDepById(data?.department_id);
        if (!department.success) {
            throw new Error(department.message);
        }

        if (!Object.values(Position).includes(data?.position)) {
            throw new Error('Position is invalid');
        }
        if (
            !Object.values(OVERTIME_REQUEST_HOUR).includes(data?.overtime_hours)
        ) {
            throw new Error('Overtime Request Hour is invalid');
        }
        const overtimeRequest = await overtimeRequestRepo.CREATE(data);
        if (!overtimeRequest.success) {
            throw new Error(overtimeRequest.message);
        }
        return {
            success: true,
            data: overtimeRequest.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `usecase error :: ${error?.message}`,
        };
    }
};

export { create_overtime_request_usecase };
