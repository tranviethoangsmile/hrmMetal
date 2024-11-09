import {
    userFindAllWithFieldUse,
    findAllUser,
    find_fcm_token_of_user_use,
} from '../../useCases';
import { sendPushNotification } from '../../utils';
import { IPushNotification } from '../interfaces';

class PushNotificationService implements IPushNotification {
    private async sendNotificationsToUsers(
        userIds: string[],
        title: string,
        body: string,
    ) {
        await Promise.all(
            userIds.map(async userId => {
                try {
                    const fcm_token = await find_fcm_token_of_user_use(userId);
                    if (fcm_token?.success) {
                        const fcmToken = fcm_token.data ?? '';
                        await sendPushNotification({
                            fcmToken,
                            title,
                            body,
                        });
                    }
                } catch (error: any) {
                    console.error(
                        `Failed to send notification to user ${userId}: ${error?.message}`,
                    );
                }
            }),
        );
    }

    private async sendPushNotificationToUser({
        fcmToken,
        title,
        body,
        key
    }: {
        fcmToken: string;
        title: string;
        body: string;
        key: string
    }) {
        try {
            await sendPushNotification({
                fcmToken,
                title,
                body,
            });
        } catch (error: any) {
            console.error(
                `Failed to send notification to user ${title}: ${error?.message}`,
            );
        }
    }
    async handlePushNotiForEvent(position: any) {
        try {
            let users;
            if (position === 'COMPORATION') {
                users = await findAllUser();
            } else {
                users = await userFindAllWithFieldUse({ position });
            }

            if (users?.success) {
                const userIds: any = users?.data?.map((user: any) => user.id);
                const title = `Safety Check Required! from ${position}`;
                const body = `Please confirm your safety status as soon as possible.`;

                // Gửi thông báo đến danh sách người dùng
                await this.sendNotificationsToUsers(userIds, title, body);
            }

            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `service -- ${error?.message}`,
            };
        }
    }

    async handlePushNotiForMessage({
        fcmToken,
        title,
        body,
        key
    }: {
        fcmToken: string;
        title: string;
        body: string;
        key: string
    }) {
        try {
            await this.sendPushNotificationToUser({ fcmToken, title, body, key });
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `service -- ${error?.message}`,
            };
        }
    }
}

export default PushNotificationService;
