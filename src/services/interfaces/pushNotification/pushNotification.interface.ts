export interface IPushNotification {
    handlePushNotiForEvent(position: string): Promise<{
        success: boolean;
        message?: string;
    }>;

    handlePushNotiForMessage({
        fcmToken,
        title,
        body,
    }: {
        fcmToken: string;
        title: string;
        body: string;
    }): Promise<{
        success: boolean;
        message?: string;
    }>;
}
