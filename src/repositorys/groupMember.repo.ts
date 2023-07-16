import { GroupMember } from '../models';

const create_group_member = async (data: any) => {
    try {
        const group_member: GroupMember | null = await GroupMember.create({
            ...data,
        });
        if (group_member != null) {
            return {
                success: true,
                data: group_member,
            };
        } else {
            return {
                success: false,
                message: 'create groupMember failed',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_group_member = async (data: any) => {
    try {
        const group_member: GroupMember | null = await GroupMember.findOne({
            where: {
                ...data,
            },
        });
        if (group_member != null) {
            return {
                success: true,
                data: group_member,
            };
        } else {
            return {
                success: false,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { create_group_member, find_group_member };
