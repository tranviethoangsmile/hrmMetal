import { create_message } from '../repositorys/message.repo';
import { create_new_message } from '../interfaces/message.interface';
import { create_massage_validate } from '../validates/message.validate';
const create_new_message = async (data: create_new_message) => {
    try {
        const valid = create_massage_validate(data);
        if (!valid?.error) {
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
        } else {
            return {
                success: false,
                message: valid?.error?.message,
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
