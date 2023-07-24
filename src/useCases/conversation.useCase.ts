import { create_conversation } from '../repositorys/conversation.repo';
import {
    find_group_of_member,
    create_groupMember,
} from './groupMember.useCase';

const create = async (data: any) => {
    try {
        const group_of_sender_id: any = await find_group_of_member({
            user_id: data.sender_id,
        });

        if (!group_of_sender_id?.success) {
            const new_conversation = await create_conversation(data);
            if (new_conversation?.success) {
                const newgroup1 = await create_groupMember({
                    user_id: data.sender_id,
                    conversation_id: new_conversation?.data?.id,
                });

                if (newgroup1?.success) {
                    const newgroup2 = await create_groupMember({
                        user_id: data.receiver_id,
                        conversation_id: new_conversation?.data?.id,
                    });

                    if (newgroup2?.success) {
                        return {
                            success: true,
                            data: {
                                conversation_id: new_conversation?.data?.id,
                            },
                        };
                    } else {
                        return {
                            success: false,
                            message: newgroup2?.message,
                        };
                    }
                } else {
                    return {
                        success: false,
                        message: newgroup1?.message,
                    };
                }
            }
        } else {
            const group_of_receiver_id: any = await find_group_of_member({
                user_id: data.receiver_id,
            });

            if (group_of_receiver_id?.success) {
                for (const group_sender of group_of_sender_id?.data) {
                    for (const group_receiver of group_of_receiver_id?.data) {
                        if (
                            group_sender.conversation_id &&
                            group_sender.conversation_id ===
                                group_receiver.conversation_id
                        ) {
                            return {
                                success: true,
                                data: {
                                    conversation_id:
                                        group_receiver.conversation_id,
                                },
                            };
                        }
                    }
                }
            }

            const new_conversation = await create_conversation(data);

            if (new_conversation?.success) {
                const newgroup1 = await create_groupMember({
                    user_id: data.sender_id,
                    conversation_id: new_conversation?.data?.id,
                });

                if (newgroup1?.success) {
                    const newgroup2 = await create_groupMember({
                        user_id: data.receiver_id,
                        conversation_id: new_conversation?.data?.id,
                    });

                    if (newgroup2?.success) {
                        return {
                            success: true,
                            data: {
                                conversation_id: new_conversation?.data?.id,
                            },
                        };
                    } else {
                        return {
                            success: false,
                            message: newgroup2?.message,
                        };
                    }
                } else {
                    return {
                        success: false,
                        message: newgroup1?.message,
                    };
                }
            }
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { create };
