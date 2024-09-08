import { Conversation, GroupMember, User } from '../../models';
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
            // Bước 1: Lấy tất cả conversation_id mà người dùng đang tham gia
            const userConversations = await GroupMember.findAll({
                where: {
                    user_id: id,
                },
                attributes: ['conversation_id'],
            });

            // Trích xuất conversation_id thành một mảng
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
                    },
                    {
                        model: User,
                        as: 'users', // Sử dụng alias khớp với định nghĩa quan hệ
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
}

export default GroupMemberRepository;
