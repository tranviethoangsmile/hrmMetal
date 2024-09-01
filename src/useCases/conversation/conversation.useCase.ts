import { ConversationRepository } from '../../repositorys';
import {
    find_group_of_member,
    create_groupMember,
    findUserById,
} from '../index';
import db from '../../dbs/db';
import { validation_id } from '../../validates';
const conversationRepo = new ConversationRepository();
const create_conversation_use = async (data: any) => {
    const t = await db.transaction();
    try {
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
            t.commit();
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
                t.commit();
                return {
                    success: true,
                    data: {
                        conversation_id: new_conversation?.data?.id,
                    },
                };
            } else {
                // lưu dữ liệu conversation_id của sender vào set
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
                // lọc các cuộc trò chuyện của sender và receiver trùng nhau.
                const commonConversationIds = receiverConversationIds.filter(
                    (id: string) => senderConversationIds.has(id),
                );

                for (const conversationId of commonConversationIds) {
                    // Kiểm tra số lượng thành viên trong mỗi cuộc trò chuyện chung
                    const members =
                        await conversationRepo.search_conversation_by_id(
                            conversationId,
                        );
                    if (members?.data?.member_count === 2) {
                        // Nếu số thành viên bằng 2, tức là chỉ có người gửi và người nhận
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

                await t.commit(); // Commit giao dịch nếu mọi thứ thành công
                return {
                    success: true,
                    data: {
                        conversation_id: new_conversation?.data?.id,
                    },
                };
            }
        }
    } catch (error: any) {
        await t.rollback();
        return {
            success: false,
            message: error?.message,
        };
    }
};

const search_conversation_by_id_use = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid) {
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

export { create_conversation_use, search_conversation_by_id_use };
