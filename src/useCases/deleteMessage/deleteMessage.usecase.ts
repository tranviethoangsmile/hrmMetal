import { DeleteMessageRepository } from '../../repositorys';
import { validate_create_delete_message } from '../../validates';
import { findUserById, search_message_with_id } from '../index';

const deleteMessageRepo = new DeleteMessageRepository();

const create_delete_message_use = async (field: any) => {
    try {
        const isValid = validate_create_delete_message(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const message = await search_message_with_id(field?.message_id);
        if (!message?.success) {
            throw new Error(`${message?.message}`);
        }
        // if (message?.data?.user_id !== field?.user_id) {
        //     throw new Error('You are not the owner of this message');
        // }
        const user = await findUserById(field?.user_id);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }
        const create_delete_message = await deleteMessageRepo.create(field);
        if (!create_delete_message?.success) {
            throw new Error(`${create_delete_message?.message}`);
        }
        return {
            success: true,
            data: create_delete_message?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use: ${error?.message}`,
        };
    }
};

export { create_delete_message_use };
