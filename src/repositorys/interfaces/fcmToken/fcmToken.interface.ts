import { FcmToken } from '../../../models';

export interface IFcmToken {
    create(field: any): Promise<{
        success: boolean;
        data?: FcmToken;
        message?: string;
    }>;

    find_fcm_token_of_user(id: string): Promise<{
        success: boolean;
        data?: FcmToken;
        message?: string;
    }>;

    destroy_old_fcm_token_of_user(id: string): Promise<{
        success: boolean;
        message?: string;
    }>;
}
