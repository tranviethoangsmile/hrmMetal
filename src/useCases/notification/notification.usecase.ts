import { notification_type } from '../../enum';
import {
    create_notification_repo,
    update_notification_repo,
    destroy_notification_repo,
    search_notification_repo,
    search_notification_of_user_repo,
} from '../../repositorys';
import { validate_create_notification, validation_id } from '../../validates';
import { findUserById } from '../user/user.useCase';

const create_notification_usecase = async (field: any) => {
    try {
        const isValid = validate_create_notification(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        if (!Object.values(notification_type).includes(field?.type)) {
            throw new Error('notification type is not valid');
        }
        const notification = await create_notification_repo({ ...field });
        if (!notification?.success) {
            throw new Error(`${notification?.message}`);
        }
        return {
            success: true,
            data: notification,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use: ${error.message}`,
        };
    }
};

const update_notification_usecase = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const result = await update_notification_repo(id);
        if (!result?.success) {
            throw new Error(`${result?.message}`);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use: ${error.message}`,
        };
    }
};

const destroy_notification_usecase = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const notification = await search_notification_usecase(id);
        if (!notification?.success) {
            throw new Error('notification not found');
        }
        const result = await destroy_notification_repo(id);
        if (!result?.success) {
            throw new Error(`${result?.message}`);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use: ${error.message}`,
        };
    }
};

const search_notification_usecase = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const notification = await search_notification_repo(id);
        if (!notification?.success) {
            throw new Error(`${notification?.message}`);
        }
        return {
            success: true,
            data: notification?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use: ${error.message}`,
        };
    }
};

const search_notification_of_user_usecase = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const user = await findUserById(id);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }
        const notifications = await search_notification_of_user_repo(id);
        if (!notifications?.success) {
            throw new Error(`${notifications?.message}`);
        }
        return {
            success: true,
            data: notifications?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use: ${error.message}`,
        };
    }
};
export {
    create_notification_usecase,
    update_notification_usecase,
    destroy_notification_usecase,
    search_notification_usecase,
    search_notification_of_user_usecase,
};
