export interface IPushNotification {
    handlePushNotiForEvent(position: string): Promise<{
        success: boolean;
        message?: string;
    }>;
}
