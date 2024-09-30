import {
    Conversation,
    DeleteConversation,
    GroupMember,
    User,
} from '../../models';
import { IGroupMemberRepository } from '../interfaces';
import { Op } from 'sequelize';
class GroupMemberRepository implements IGroupMemberRepository {
    async create_group_member(data: any) {
        try {
            const group_member: GroupMember | null = await GroupMember.create({
                ...data,
            });
            if (group_member === null) {
                throw new Error(`create groupMember failed`);
            }
            return {
                success: true,
                data: group_member,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async find_group_member(id: string) {
        try {
            const group_member: GroupMember[] | null =
                await GroupMember.findAll({
                    where: {
                        user_id: id,
                    },
                    attributes: ['conversation_id', 'id', 'joined_at'],
                    include: [
                        {
                            model: Conversation,
                            as: 'conversation',
                            attributes: ['member_count'],
                        },
                    ],
                });
            if (group_member === null || group_member.length < 1) {
                throw new Error('group member not found');
            }
            return {
                success: true,
                data: group_member,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async find_group_member_of_user(id: string) {
        try {
            const userConversations = await GroupMember.findAll({
                where: {
                    user_id: id,
                },
                attributes: ['conversation_id'],
            });
            const conversationIds = userConversations.map(
                gm => gm.conversation_id,
            );

            if (conversationIds.length === 0) {
                throw new Error('User is not part of any conversations.');
            }

            // Bước 2: Lấy tất cả các GroupMember trong các conversation đó, ngoại trừ người dùng hiện tại
            const groupMembers = await GroupMember.findAll({
                where: {
                    conversation_id: {
                        [Op.in]: conversationIds,
                    },
                    user_id: {
                        [Op.ne]: id, // Loại trừ người dùng hiện tại
                    },
                },
                attributes: ['conversation_id', 'id', 'joined_at'],
                include: [
                    {
                        model: Conversation,
                        as: 'conversation',
                        attributes: ['member_count'],
                        include: [
                            {
                                model: DeleteConversation,
                                as: 'delete_conversations',
                                attributes: ['user_id'],
                            },
                        ],
                    },
                    {
                        model: User,
                        as: 'users',
                        attributes: ['id', 'name', 'avatar'],
                    },
                ],
            });

            if (groupMembers.length === 0) {
                throw new Error('No other group members found.');
            }

            return {
                success: true,
                data: groupMembers,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async find_user_by_conversation_id(id: string) {
        try {
            const users: GroupMember[] | null = await GroupMember.findAll({
                where: {
                    conversation_id: id,
                },
                attributes: ['user_id'],
            });

            if (users === null || users.length < 1) {
                throw new Error('No user found in the conversation');
            }
            return {
                success: true,
                data: users,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repo -- ${error?.message}`,
            };
        }
    }
}

export default GroupMemberRepository;
