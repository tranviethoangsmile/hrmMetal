import { FcmToken } from '../../models';
import { IFcmToken } from '../interfaces';

class FcmTokenRepository implements IFcmToken {
    async create(field: any) {
        try {
            const fcmToken: FcmToken | null = await FcmToken.create({
                ...field,
            });

            if (fcmToken === null) {
                throw new Error(`create fcmtoken not successfully`);
            }
            return {
                success: true,
                data: fcmToken,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repo -- ${error?.message}`,
            };
        }
    }

    async find_fcm_token_of_user(id: string) {
        try {
            console.log(id);
            const fcmToken: FcmToken | null = await FcmToken.findOne({
                where: {
                    user_id: id,
                },
            });

            if (!fcmToken) {
                throw new Error(`FCM not exist`);
            }

            return {
                success: true,
                data: fcmToken,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repo -- ${error.message}`,
            };
        }
    }

    async destroy_old_fcm_token_of_user(id: string) {
        try {
            const result: number = await FcmToken.destroy({
                where: {
                    user_id: id,
                },
            });
            if (result < 1) {
                throw new Error(`destroy fcm token not successfully`);
            }
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repo -- ${error?.message}`,
            };
        }
    }
}

export default FcmTokenRepository;
