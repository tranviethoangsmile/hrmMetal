import { Conversation } from '../../models';

const create_conversation = async (data: any) => {
    try {
        const conversation: Conversation | null = await Conversation.create({
            ...data,
        });
        if (conversation != null) {
            return {
                success: true,
                data: conversation,
            };
        } else {
            return {
                success: false,
                message: 'create conversation failed',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { create_conversation };
