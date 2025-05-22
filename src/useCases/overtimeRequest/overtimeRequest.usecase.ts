import { OvertimeRequestRepository } from '../../repositorys';
import { validate_create_overtime_request } from '../../validates';
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

export { create_overtime_request_usecase };
