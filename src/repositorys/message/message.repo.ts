import { DeleteMessage, Message, User } from '../../models';
import { IMessageRepository } from '../interfaces';
class MessageRepository implements IMessageRepository {
    async create_message(data: any) {
        try {
            const message: Message | null = await Message.create({
                ...data,
            });
            if (message === null) {
                throw new Error(`create message failed`);
            }
            return {
                success: true,
                data: message,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async search_all_message_of_conversation(id: string) {
        try {
            const messages: Message[] | null = await Message.findAll({
                where: {
                    conversation_id: id,
                },
                attributes: [
                    'id',
                    'message',
                    'user_id',
                    'created_at',
                    'is_unsend',
                ],
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'avatar'],
                    },
                    {
                        model: DeleteMessage,
                        as: 'delete_messages',
                        attributes: ['id', 'user_id', 'message_id'],
                    },
                ],
            });
            if (messages === null || messages.length < 1) {
                throw new Error(`message not exist`);
            }

            return {
                success: true,
                data: messages,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async unSend_message_with_id(id: string) {
        try {
            const result: [number] = await Message.update(
                {
                    is_unsend: true,
                },
                {
                    where: {
                        id: id,
                    },
                },
            );
            if (result[0] < 1) {
                throw new Error(`update not successfully`);
            }
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async search_message_with_id(id: string) {
        try {
            const message: Message | null = await Message.findByPk(id, {
                attributes: ['id', 'message', 'user_id', 'created_at'],
            });
            if (message === null) {
                throw new Error(`message not exists`);
            }
            return {
                success: true,
                data: message,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }
}

export default MessageRepository;
