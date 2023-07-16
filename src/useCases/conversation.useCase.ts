import { create_conversation } from '../repositorys/conversation.repo';
import {
    find_group_of_member,
    create_groupMember,
} from './groupMember.useCase';

const create = async (data: any) => {
    try {
        const group_of_sender_id = await find_group_of_member({
            user_id: data.sender_id,
        });
        if (!group_of_sender_id?.success) {
            const new_conversation = await create_conversation(data);
            if (new_conversation?.success) {
                const newgroup = await create_groupMember({
                    user_id: data.sender_id,
                    conversation_id: new_conversation?.data?.id,
                });
                if (newgroup?.success) {
                    const newgroup = await create_groupMember({
                        user_id: data.receiver_id,
                        conversation_id: new_conversation?.data?.id,
                    });
                    if (newgroup?.success) {
                        return {
                            success: true,
                            data: {
                                conversation_id: new_conversation?.data?.id,
                            },
                        };
                    }
                } else {
                    return {
                        success: false,
                        message: newgroup?.message,
                    };
                }
            }
        } else {
            const group_of_receiver_id = await find_group_of_member({
                user_id: data.receiver_id,
            });
            if (group_of_receiver_id?.success) {
                if (
                    group_of_receiver_id?.data?.conversation_id ===
                    group_of_sender_id?.data?.conversation_id
                ) {
                    return {
                        success: true,
                        data: {
                            conversation_id:
                                group_of_receiver_id?.data?.conversation_id,
                        },
                    };
                } else {
                    const new_conversation = await create_conversation(data);
                    if (new_conversation?.success) {
                        const newgroup = await create_groupMember({
                            user_id: data.sender_id,
                            conversation_id: new_conversation?.data?.id,
                        });
                        if (newgroup?.success) {
                            const newgroup = await create_groupMember({
                                user_id: data.receiver_id,
                                conversation_id: new_conversation?.data?.id,
                            });
                            if (newgroup?.success) {
                                return {
                                    success: true,
                                    data: {
                                        conversation_id:
                                            new_conversation?.data?.id,
                                    },
                                };
                            }
                        } else {
                            return {
                                success: false,
                                message: newgroup?.message,
                            };
                        }
                    }
                }
            } else {
                const new_conversation = await create_conversation(data);
                if (new_conversation?.success) {
                    const newgroup = await create_groupMember({
                        user_id: data.sender_id,
                        conversation_id: new_conversation?.data?.id,
                    });
                    if (newgroup?.success) {
                        const newgroup = await create_groupMember({
                            user_id: data.receiver_id,
                            conversation_id: new_conversation?.data?.id,
                        });
                        if (newgroup?.success) {
                            return {
                                success: true,
                                data: {
                                    conversation_id: new_conversation?.data?.id,
                                },
                            };
                        }
                    } else {
                        return {
                            success: false,
                            message: newgroup?.message,
                        };
                    }
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
