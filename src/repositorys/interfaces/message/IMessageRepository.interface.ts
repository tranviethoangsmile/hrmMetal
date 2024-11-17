import { create_new_message } from '../../../interfaces';
import { Message } from '../../../models';
export interface IMessageRepository {
    create_message(data: create_new_message): Promise<{
        success: boolean;
        data?: any;
        message?: string;
    }>;

    search_all_message_of_conversation(id: string): Promise<{
        success: boolean;
        data?: Message[];
        message?: string;
    }>;

    unSend_message_with_id(id: string): Promise<{
        success: boolean;
        message?: string;
    }>;

    search_message_with_id(id: string): Promise<{
        success: boolean;
        data?: Message;
        message?: string;
    }>;
}
