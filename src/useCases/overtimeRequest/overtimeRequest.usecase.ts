import { OvertimeRequestRepository } from '../../repositorys';
import {
    validate_create_overtime_request,
    validate_update_is_confirm_overtime_request,
    validation_id,
    validate_delete_overtime_request,
    validate_update_approved_admin_overtime_request,
} from '../../validates';
import {
    findUserById,
    getDepById,
    find_fcm_token_of_user_use,
    create_notification_usecase,
} from '../index';
import { Position, OVERTIME_REQUEST_HOUR } from '../../enum';
import { PushNotificationService } from '../../services';
import { create_notification_interface } from '../../interfaces';
const overtimeRequestRepo = new OvertimeRequestRepository();
const pushNotificationService = new PushNotificationService();
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
        if (data.department_id !== user.data?.department_id) {
            throw new Error('Department ID is invalid');
        }
        const leader = await findUserById(data?.leader_id);
        if (!leader.success) {
            throw new Error(leader.message);
        }
        if (leader.data?.role.toString() === 'STAFF') {
            throw new Error('Leader is invalid');
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
        const fcm_token = await find_fcm_token_of_user_use(data.user_id);

        if (fcm_token?.success) {
            const fcmToken = fcm_token.data ?? '';
            const title = `Overtime ${data.date}`;
            const body = `Overtime request from ${leader.data?.name} in ${department.data?.name} department`;
            const key = '';
            await pushNotificationService.handlePushNotiForMessage({
                fcmToken,
                title,
                body,
                key,
            });
        }
        try {
            const field_notification: create_notification_interface = {
                title: 'OVERTIME REQUEST',
                user_id: data.user_id,
                type: 'INFO',
                message: `Overtime Request from ${leader.data?.name} in ${department.data?.name} department`,
            };
            const notification = await create_notification_usecase(
                field_notification,
            );

            if (!notification?.success) {
                console.error(
                    `Notification creation failed: ${notification?.message}`,
                );
            }
        } catch (error: any) {
            console.error(`Notification error: ${error?.message}`);
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

const get_all_overtime_request_usecase = async () => {
    try {
        const overtime_requests = await overtimeRequestRepo.GET_ALL();
        if (!overtime_requests.success) {
            throw new Error(overtime_requests.message);
        }
        return {
            success: true,
            data: overtime_requests.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `usecase error :: ${error?.message}`,
        };
    }
};

const get_ovetime_request_by_id_usecase = async (id: string) => {
    try {
        const isVlalid = validation_id(id);
        if (isVlalid.error) {
            throw new Error(isVlalid.error.message);
        }
        const overtime_request = await overtimeRequestRepo.GET_BY_ID(id);
        if (!overtime_request.success) {
            throw new Error(overtime_request.message);
        }
        return {
            success: true,
            data: overtime_request.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `usecase error :: ${error?.message}`,
        };
    }
};

const update_isConfirm_ovetime_request_usecase = async (data: any) => {
    try {
        const isVlalid = validate_update_is_confirm_overtime_request(data);
        if (isVlalid.error) {
            throw new Error(isVlalid.error.message);
        }
        const user = await findUserById(data.user_id);
        if (!user.success) {
            throw new Error(user.message);
        }

        const this_overtime = await overtimeRequestRepo.GET_BY_ID(data.id);
        if (!this_overtime.success) {
            throw new Error(this_overtime.message);
        }
        const overtimeRequest = await overtimeRequestRepo.UPDATE_CONFIRM(data);
        if (!overtimeRequest.success) {
            throw new Error(overtimeRequest.message);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `usecase error :: ${error?.message}`,
        };
    }
};

const delete_overtime_request_by_id_usecase = async (data: any) => {
    try {
        const isVlalid = validate_delete_overtime_request(data);
        if (isVlalid.error) {
            throw new Error(isVlalid.error.message);
        }
        const request = await overtimeRequestRepo.GET_BY_ID(data.id);
        if (!request.success) {
            throw new Error(request.message);
        }
        if (request.data?.leader_id !== data.user_id) {
            throw new Error('You are not allowed to delete this request');
        }
        const overtime_request = await overtimeRequestRepo.DELETE_BY_ID(
            data.id,
        );
        if (!overtime_request.success) {
            throw new Error(overtime_request.message);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `usecase error :: ${error?.message}`,
        };
    }
};

const update_approved_admin_overtime_request_usecase = async (data: any) => {
    try {
        const isVlalid = validate_update_approved_admin_overtime_request(data);
        if (isVlalid.error) {
            throw new Error(isVlalid.error.message);
        }
        const this_overtime = await overtimeRequestRepo.GET_BY_ID(data.id);
        if (!this_overtime.success) {
            throw new Error(this_overtime.message);
        }
        const overtimeRequest = await overtimeRequestRepo.UPDATE_APPROVE_ADMIN(
            data,
        );
        if (!overtimeRequest.success) {
            throw new Error(overtimeRequest.message);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `usecase error :: ${error?.message}`,
        };
    }
};

export {
    create_overtime_request_usecase,
    get_all_overtime_request_usecase,
    update_isConfirm_ovetime_request_usecase,
    get_ovetime_request_by_id_usecase,
    delete_overtime_request_by_id_usecase,
    update_approved_admin_overtime_request_usecase,
};
