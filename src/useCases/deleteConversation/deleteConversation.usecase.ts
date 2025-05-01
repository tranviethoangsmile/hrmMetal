import { create_delete_message_cotroller } from '../../controllers';
import { DeleteConversationRepository } from '../../repositorys';
import {
    find_group_of_member,
    findUserById,
    search_all_message_of_conversation_use,
    search_conversation_by_id_use,
} from '../../useCases';
import {
    validate_create_delete_conversation,
    validation_id,
} from '../../validates';

const deleteConversation = new DeleteConversationRepository();

const create_delete_conversation_use = async (field: any) => {
    try {
        const isValid = validate_create_delete_conversation(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const conversation = await search_conversation_by_id_use(
            field.conversation_id,
        );
        if (!conversation?.success) {
            throw new Error(`${conversation?.message}`);
        }

        const conversations = await find_group_of_member(field?.user_id);
        const isAuth = conversations?.data?.map(value => {
            if (value?.conversation_id === field?.conversation_id) {
                return true;
            }
            return false;
        });
        if (!isAuth) {
            throw new Error(`authentication`);
        }

        const user = await findUserById(field.user_id);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }
        const messages = await search_all_message_of_conversation_use(
            field?.conversation_id,
        );
        if (messages?.success) {
            const messageIds = messages?.data?.map(message => message.id);
            if (Array.isArray(messageIds) && messageIds.length > 0) {
                await Promise.all(
                    messageIds.map(async id => {
                        try {
                            await create_delete_message_cotroller({
                                user_id: field?.user_id,
                                message_id: id,
                            });
                        } catch (error: any) {
                            throw new Error(`${error?.message}`);
                        }
                    }),
                );
            }
        }

        const dlConversation = await deleteConversation.create(field);
        if (!dlConversation?.success) {
            throw new Error(`${dlConversation?.message}`);
        }
        return {
            success: true,
            data: dlConversation?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use -- ${error?.message}`,
        };
    }
};

const find_deleted_conversation_by_conversation_id_use = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const conversation = await deleteConversation.find_by_conversation_id(
            id,
        );

        if (!conversation?.success) {
            throw new Error(`${conversation?.message}`);
        }
        return {
            success: true,
            data: conversation?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use -- ${error?.message}`,
        };
    }
};

const destroy_delete_conversation_by_conversation_id_use = async (
    id: string,
) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const conversation = await deleteConversation.delete_by_conversation_id(
            id,
        );

        if (!conversation?.success) {
            throw new Error(`${conversation?.message}`);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use -- ${error?.message}`,
        };
    }
};
export {
    create_delete_conversation_use,
    find_deleted_conversation_by_conversation_id_use,
    destroy_delete_conversation_by_conversation_id_use,
};
