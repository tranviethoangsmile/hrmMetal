import { create_message } from '../../repositorys/message/message.repo';
import { create_new_message } from '../../interfaces/message/message.interface';
import { create_massage_validate } from '../../validates/message/message.validate';
import { findUserById } from '../user/user.useCase';
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

        const new_message = await create_message(data);
        if (new_message?.success) {
            return {
                success: new_message?.success,
                data: new_message?.data,
            };
        } else {
            return {
                success: new_message?.success,
                message: new_message?.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { create_new_message };
