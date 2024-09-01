import { create_new_message } from '../../interfaces/message/message.interface';
import { create_massage_validate } from '../../validates/message/message.validate';
import { findUserById } from '../user/user.useCase';
import { search_conversation_by_id_use } from '../../useCases';
import { MessageRepository } from '../../repositorys';
import { validation_id } from '../../validates';
const messageRepository = new MessageRepository();
const create_new_message = async (data: any) => {
    try {
        const valid = create_massage_validate(data);
        if (valid?.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const user = await findUserById(data?.user_id);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }

        const conversation = await search_conversation_by_id_use(
            data?.conversation_id,
        );
        if (!conversation?.success) {
            throw new Error(`${conversation?.message}`);
        }

        const new_message = await messageRepository.create_message(data);
        if (!new_message?.success) {
            throw new Error(`${new_message?.message}`);
        }
        return {
            success: true,
            data: new_message?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const search_all_message_of_conversation_use = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const conversations =
            await messageRepository.search_all_message_of_conversation(id);
        if (!conversations?.success) {
            throw new Error(`${conversations?.message}`);
        }
        return {
            success: true,
            data: conversations?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { create_new_message, search_all_message_of_conversation_use };
