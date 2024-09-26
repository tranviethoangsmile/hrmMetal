import { Conversation } from '../../models';
import { IConversationRepository } from '../interfaces';
class ConversationRepository implements IConversationRepository {
    async create_conversation(data: any) {
        try {
            const conversation: Conversation | null = await Conversation.create(
                {
                    ...data,
                },
            );
            if (conversation === null) {
                throw new Error(`create conversation faild`);
            }
            return {
                success: true,
                data: conversation,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async search_conversation_by_id(id: string) {
        try {
            const conversation: Conversation | null =
                await Conversation.findByPk(id, {
                    attributes: ['id', 'title', 'member_count'],
                });
            if (conversation === null) {
                throw new Error(`conversation not exist`);
            }
            return {
                success: true,
                data: conversation,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }
}
export default ConversationRepository;
