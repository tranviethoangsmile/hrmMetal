import { create_new_message } from '../../interfaces';
import {
    find_deleted_conversation_by_conversation_id_use,
    find_group_of_member,
    search_conversation_by_id_use,
    findUserById,
    destroy_delete_conversation_by_conversation_id_use,
    find_user_by_conversation_id_use,
    find_fcm_token_of_user_use,
} from '../../useCases';
import { MessageRepository } from '../../repositorys';
import { validation_id, create_massage_validate } from '../../validates';
import { PushNotificationService } from '../../services';
import { E_message_type } from '../../enum';
const messageRepository = new MessageRepository();
const pushNotificationService = new PushNotificationService();
const create_new_message = async (data: any) => {
    try {
        const valid = create_massage_validate(data);
        if (valid?.error) {
            throw new Error(`${valid?.error.message}`);
        }
        if (!Object.values(E_message_type).includes(data.message_type)) {
            throw new Error(`message_type not valid`);
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

        const conversations = await find_group_of_member(data?.user_id);

        const isAuth = conversations?.data?.some(
            value => value?.conversation_id === data?.conversation_id,
        );
        if (!isAuth) {
            throw new Error(`authentication`);
        }

        const deleteConversation =
            await find_deleted_conversation_by_conversation_id_use(
                data.conversation_id,
            );
        if (deleteConversation?.success) {
            await destroy_delete_conversation_by_conversation_id_use(
                data.conversation_id,
            );
        }
        const new_message = await messageRepository.create_message(data);
        if (!new_message?.success) {
            throw new Error(`${new_message?.message}`);
        }

        const users = await find_user_by_conversation_id_use(
            data?.conversation_id,
        );
        if (users?.success) {
            const sender_info = users?.data?.find(user => {
                return user?.user_id === data?.user_id;
            });
            const receiver_ids = users?.data?.filter(
                user =>
                    String(user.dataValues.user_id) !== String(data?.user_id),
            );

            for (const receiver of receiver_ids!) {
                const fcm_token = await find_fcm_token_of_user_use(
                    receiver.user_id,
                );

                if (fcm_token?.success) {
                    const fcmToken = fcm_token.data ?? '';
                    const title =
                        sender_info?.dataValues.users.name ?? 'New message';
                    const body = new_message?.data?.message ?? '';
                    const key = data?.conversation_id
                    await pushNotificationService.handlePushNotiForMessage({
                        fcmToken,
                        title,
                        body,
                        key
                    });
                }
            }
        }

        return {
            success: true,
            data: new_message?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use: ${error?.message}`,
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

const unSend_message_with_id_use = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const message = await messageRepository.search_message_with_id(id);
        if (!message?.success) {
            throw new Error(`${message?.message}`);
        }
        const destroy_result = await messageRepository.unSend_message_with_id(
            id,
        );

        if (!destroy_result?.success) {
            throw new Error(`${destroy_result?.message}`);
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
};

const search_message_with_id = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const message = await messageRepository.search_message_with_id(id);
        if (!message?.success) {
            throw new Error(`${message?.message}`);
        }
        return {
            success: true,
            data: message?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export {
    create_new_message,
    search_all_message_of_conversation_use,
    unSend_message_with_id_use,
    search_message_with_id,
};
