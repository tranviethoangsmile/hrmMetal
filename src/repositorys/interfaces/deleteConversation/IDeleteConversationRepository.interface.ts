import { DeleteConversation } from '../../../models';

export interface IDeleteConversation {
    create(field: any): Promise<{
        success: boolean;
        data?: DeleteConversation;
        message?: string;
    }>;
    delete_by_conversation_id(id: string): Promise<{
        success: boolean;
        message?: string;
    }>;
    find_by_conversation_id(id: string): Promise<{
        success: boolean;
        data?: DeleteConversation;
        message?: string;
    }>;
}
