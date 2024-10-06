import {
    userFindAllWithFieldUse,
    findAllUser,
    find_fcm_token_of_user_use,
} from '../../useCases';
import { sendPushNotification } from '../../utils';
import { IPushNotification } from '../interfaces';

class PushNotificationService implements IPushNotification {
    async handlePushNotiForEvent(position: any) {
        try {
            if (position === 'COMPORATION') {
                const users = await findAllUser();
                if (users?.success) {
                    const userIds: any = users?.data?.map(user => {
                        return user.id;
                    });
                    for (const userId of userIds) {
                        const fcm_token = await find_fcm_token_of_user_use(
                            userId,
                        );
                        if (fcm_token?.success) {
                            const fcmToken = fcm_token.data ?? '';
                            const title = 'safety check';
                            const body = 'check now !!';
                            await sendPushNotification({
                                fcmToken,
                                title,
                                body,
                            });
                        }
                    }
                }
            } else {
                const users = await userFindAllWithFieldUse({ position });
                if (users?.success) {
                    const userIds: any = users?.data?.map(user => {
                        return user.id;
                    });
                    for (const userId of userIds) {
                        const fcm_token = await find_fcm_token_of_user_use(
                            userId,
                        );
                        if (fcm_token?.success) {
                            const fcmToken = fcm_token.data ?? '';
                            const title = 'safety check';
                            const body = 'check now !!';
                            await sendPushNotification({
                                fcmToken,
                                title,
                                body,
                            });
                        }
                    }
                }
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
}
export default PushNotificationService;
