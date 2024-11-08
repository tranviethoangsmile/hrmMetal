import { ConversationRepository } from '../../repositorys';
import {
    find_group_of_member,
    create_groupMember,
    findUserById,
} from '../index';
import {
    validation_id,
    validate_create_conversation,
    validate_create_conversation_group,
} from '../../validates';
const conversationRepo = new ConversationRepository();

const create_conversation_group_use = async (data: any) => {
    try {
        const isValid = validate_create_conversation_group(data);
        if (isValid?.error) {
            throw new Error(`-validate- ${isValid?.error.message}`);
        }
        const sender = await findUserById(data.sender_id);
        if (!sender?.success) {
            throw new Error(`${sender?.message}`);
        }
        await Promise.all(
            data.receivers.map(async ({ user_id }: { user_id: string }) => {
                const receiver = await findUserById(user_id);
                console.log(receiver);
                if (!receiver?.success) {
                    throw new Error(`${receiver?.message}`);
                }
            }),
        );
        const new_conversation = await conversationRepo.create_conversation({
            title: data.title,
            member_count: data?.receivers.length + 1,
        });
        if (!new_conversation?.success) {
            throw new Error(`${new_conversation?.message}`);
        }
        const senderOf = await create_groupMember({
            user_id: data.sender_id,
            conversation_id: new_conversation?.data?.id!,
            role: 'ADMIN',
        });
        if (!senderOf?.success) {
            throw new Error(`${senderOf?.message}`);
        }

        await Promise.all(
            data.receivers.map(async ({ user_id }: { user_id: string }) => {
                console.log('id', user_id);
                const receiverOf = await create_groupMember({
                    user_id: user_id,
                    conversation_id: new_conversation?.data?.id!,
                    role: 'MEMBER',
                });
                console.log('L>>>', receiverOf);
                if (!receiverOf?.success) {
                    throw new Error(`${receiverOf?.message}`);
                }
            }),
        );
        return {
            success: true,
            data: {
                conversation_id: new_conversation?.data?.id,
            },
        };
    } catch (error: any) {
        return {
            success: false,
            message: `--use--${error?.message}`,
        };
    }
};
const create_conversation_use = async (data: any) => {
    // const t = await db.transaction();
    try {
        const isValid = validate_create_conversation(data);
        if (isValid?.error) {
            throw new Error(isValid?.error.message);
        }
        const sender = await findUserById(data.sender_id);
        if (!sender?.success) {
            throw new Error(`${sender?.message}`);
        }
        const receiver = await findUserById(data.receiver_id);
        if (!receiver?.success) {
            throw new Error(`${receiver?.message}`);
        }
        const group_of_sender_id: any = await find_group_of_member(
            data.sender_id,
        );
        if (!group_of_sender_id?.success) {
            const new_conversation = await conversationRepo.create_conversation(
                data,
            );
            if (!new_conversation?.success) {
                throw new Error(`${new_conversation?.message}`);
            }
            const senderOf = await create_groupMember({
                user_id: data.sender_id,
                conversation_id: new_conversation?.data?.id!,
                role: 'ADMIN',
            });
            if (!senderOf?.success) {
                throw new Error(`${senderOf?.message}`);
            }
            const receiverOf = await create_groupMember({
                user_id: data.receiver_id,
                conversation_id: new_conversation?.data?.id!,
                role: 'MEMBER',
            });
            if (!receiverOf?.success) {
                throw new Error(`${receiverOf?.message}`);
            }
            // t.commit();
            return {
                success: true,
                data: {
                    conversation_id: new_conversation?.data?.id,
                },
            };
        } else {
            const group_of_receiver_id: any = await find_group_of_member(
                data.receiver_id,
            );
            if (!group_of_receiver_id?.success) {
                const new_conversation =
                    await conversationRepo.create_conversation(data);

                if (!new_conversation?.success) {
                    throw new Error(`${new_conversation?.message}`);
                }
                const senderOf = await create_groupMember({
                    user_id: data.sender_id,
                    conversation_id: new_conversation?.data?.id!,
                    role: 'ADMIN',
                });

                if (!senderOf?.success) {
                    throw new Error(`${senderOf?.message}`);
                }
                const receiverOf = await create_groupMember({
                    user_id: data.receiver_id,
                    conversation_id: new_conversation?.data?.id!,
                    role: 'MEMBER',
                });

                if (!receiverOf?.success) {
                    throw new Error(`${receiverOf?.message}`);
                }
                // t.commit();
                return {
                    success: true,
                    data: {
                        conversation_id: new_conversation?.data?.id,
                    },
                };
            } else {
                const senderConversationIds = new Set(
                    group_of_sender_id.data.map(
                        (group: { conversation_id: string }) =>
                            group.conversation_id,
                    ),
                );
                const receiverConversationIds = group_of_receiver_id.data.map(
                    (group: { conversation_id: string }) =>
                        group.conversation_id,
                );

                const commonConversationIds = receiverConversationIds.filter(
                    (id: string) => senderConversationIds.has(id),
                );

                for (const conversationId of commonConversationIds) {
                    const members =
                        await conversationRepo.search_conversation_by_id(
                            conversationId,
                        );
                    if (members?.data?.member_count === 2) {
                        return {
                            success: true,
                            data: {
                                conversation_id: conversationId,
                            },
                        };
                    }
                }
                const new_conversation =
                    await conversationRepo.create_conversation(data);
                if (!new_conversation?.success) {
                    throw new Error(`${new_conversation?.message}`);
                }

                const senderOf = await create_groupMember({
                    user_id: data.sender_id,
                    conversation_id: new_conversation?.data?.id!,
                    role: 'ADMIN',
                });
                if (!senderOf?.success) {
                    throw new Error(`${senderOf?.message}`);
                }

                const receiverOf = await create_groupMember({
                    user_id: data.receiver_id,
                    conversation_id: new_conversation?.data?.id!,
                    role: 'MEMBER',
                });
                if (!receiverOf?.success) {
                    throw new Error(`${receiverOf?.message}`);
                }

                // await t.commit();
                return {
                    success: true,
                    data: {
                        conversation_id: new_conversation?.data?.id,
                    },
                };
            }
        }
    } catch (error: any) {
        // await t.rollback();
        return {
            success: false,
            message: error?.message,
        };
    }
};

const search_conversation_by_id_use = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`${isValid?.error?.message}`);
        }
        const conversation = await conversationRepo.search_conversation_by_id(
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
            message: error?.message,
        };
    }
};

export {
    create_conversation_use,
    search_conversation_by_id_use,
    create_conversation_group_use,
};
