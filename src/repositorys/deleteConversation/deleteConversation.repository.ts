import { DeleteConversation } from '../../models';
import { IDeleteConversation } from '../interfaces';

class DeleteConversationRepository implements IDeleteConversation {
    async create(field: any) {
        try {
            const dlConversation: DeleteConversation | null =
                await DeleteConversation.create({
                    ...field,
                });
            if (dlConversation === null) {
                throw new Error('create deleteConversation failed');
            }
            return {
                success: true,
                data: dlConversation,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async delete_by_conversation_id(id: string) {
        try {
            const result: number = await DeleteConversation.destroy({
                where: {
                    conversation_id: id,
                },
            });

            if (result < 1) {
                throw new Error(`delete not successfully`);
            }
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async find_by_conversation_id(id: string) {
        try {
            const dlConversation: DeleteConversation | null =
                await DeleteConversation.findOne({
                    where: {
                        conversation_id: id,
                    },
                });

            if (dlConversation === null) {
                throw new Error(`not found`);
            }
            return {
                success: true,
                data: dlConversation,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
}

export default DeleteConversationRepository;
