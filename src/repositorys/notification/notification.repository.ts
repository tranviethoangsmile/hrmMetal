import { Notification } from '../../models';
import { INotificationRepository } from '../interfaces/notification/INotificationRepository';

class NotificationRepository implements INotificationRepository {
    async create_notification_repo(field: any) {
        try {
            const notification: Notification | null = await Notification.create(
                {
                    ...field,
                },
            );

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
    }
    async update_notification_repo(id: string) {
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
    }

    async destroy_notification_repo(id: string) {
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
    }

    async search_notification_of_user_repo(id: string) {
        try {
            const notifications: Notification[] | null =
                await Notification.findAll({
                    where: {
                        user_id: id,
                        is_readed: false,
                    },
                    attributes: [
                        'id',
                        'type',
                        'title',
                        'message',
                        'is_readed',
                        'created_at',
                    ],
                });

            if (notifications === null || notifications.length < 1) {
                throw new Error('notifications not available');
            }
            return {
                success: true,
                data: notifications,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repo ${error?.message}`,
            };
        }
    }

    async search_notification_repo(id: string) {
        try {
            const notification: Notification | null =
                await Notification.findOne({
                    where: {
                        id: id,
                    },
                    attributes: [
                        'type',
                        'title',
                        'message',
                        'is_readed',
                        'created_at',
                    ],
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
    }
}

export default NotificationRepository;
