import { Conversation, GroupMember } from '../../models';
import { IGroupMemberRepository } from '../interfaces';

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
}

export default GroupMemberRepository;
