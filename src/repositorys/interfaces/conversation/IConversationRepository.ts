import { Conversation } from '../../../models';

export interface IConversationRepository {
    create_conversation(field: any): Promise<{
        success: boolean;
        data?: Conversation;
        message?: string;
    }>;

    search_conversation_of_user(id: string): Promise<{
        success: boolean;
        data?: Conversation[];
        message?: string;
    }>;

    search_conversation_by_id(id: string): Promise<{
        success: boolean;
        data?: Conversation;
        message?: string;
    }>;
}
