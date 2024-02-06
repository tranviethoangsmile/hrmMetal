import { Message } from '../../models';

const create_message = async (data: any) => {
    try {
        const message: Message | null = await Message.create({
            ...data,
        });
        if (message != null) {
            return {
                success: true,
                data: message,
            };
        } else {
            return {
                success: false,
                message: 'create message failed',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { create_message };
