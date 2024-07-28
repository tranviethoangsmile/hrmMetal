import { Notification } from '../../models';

const create_notification_repo = async (field: any) => {
    try {
        const notification: Notification | null = await Notification.create({
            ...field,
        });

        if (notification === null) {
            throw new Error('Error creating notification');
        }
        return {
            success: true,
            data: notification,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo ${error?.message}`,
        };
    }
};

const update_notification_repo = async (id: string) => {
    try {
        const result = await Notification.update(
            { is_readed: true },
            {
                where: {
                    id: id,
                },
            },
        );
        if (result[0] !== 1) {
            throw new Error('Error updating notification');
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo ${error?.message}`,
        };
    }
};

const destroy_notification_repo = async (id: string) => {
    try {
        const result = await Notification.destroy({
            where: {
                id: id,
            },
        });
        if (result !== 1) {
            throw new Error('Error deleting notification');
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo ${error?.message}`,
        };
    }
};

const search_notification_repo = async (id: string) => {
    try {
        const notification: Notification | null = await Notification.findOne({
            where: {
                id: id,
            },
            attributes: ['type', 'title', 'message', 'is_readed', 'created_at'],
        });

        if (notification === null) {
            throw new Error('notification not available');
        }
        return {
            success: true,
            data: notification,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo ${error?.message}`,
        };
    }
};

export {
    create_notification_repo,
    update_notification_repo,
    destroy_notification_repo,
    search_notification_repo,
};
