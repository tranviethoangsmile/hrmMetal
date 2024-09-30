import { FcmTokenRepository } from '../../repositorys';
import { validate_create_fcm_token, validation_id } from '../../validates';
import { Device } from '../../enum';
import { findUserById } from '../../useCases';
const fcmTokenRepository = new FcmTokenRepository();

const create_fcm_token_use = async (field: any) => {
    try {
        const isValid = validate_create_fcm_token(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        if (!Object.values(Device).includes(field?.device_type)) {
            throw new Error(`device_type not valid`);
        }
        const user = await findUserById(field?.user_id);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }
        const getFcmToken = await fcmTokenRepository.find_fcm_token_of_user(
            field?.user_id,
        );
        if (getFcmToken?.success) {
            await fcmTokenRepository.destroy_old_fcm_token_of_user(
                field?.user_id,
            );
        }
        const fcmToken = await fcmTokenRepository.create(field);
        if (!fcmToken?.success) {
            throw new Error(`${fcmToken?.message}`);
        }
        return {
            success: true,
            data: fcmToken?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use -- ${error?.message}`,
        };
    }
};

const find_fcm_token_of_user_use = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const fcmToken = await fcmTokenRepository.find_fcm_token_of_user(id);
        if (!fcmToken?.success) {
            throw new Error(`${fcmToken?.message}`);
        }
        return {
            success: true,
            data: fcmToken?.data?.fcm_token,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use -- ${error?.message}`,
        };
    }
};

export { create_fcm_token_use, find_fcm_token_of_user_use };
