import { Notification } from '../../../models';
export interface INotificationRepository {
    create_notification_repo(
        field: any,
    ): Promise<{ success: boolean; data?: Notification; message?: string }>;
    update_notification_repo(
        id: string,
    ): Promise<{ success: boolean; message?: string }>;
    destroy_notification_repo(
        id: string,
    ): Promise<{ success: boolean; message?: string }>;
    search_notification_repo(id: string): Promise<{
        success: boolean;
        data?: Notification;
        message?: string;
    }>;
    search_notification_of_user_repo(
        id: string,
    ): Promise<{ success: boolean; data?: Notification[]; message?: string }>;
}
