import moment from 'moment-timezone';
import { GroupMemberRepository } from '../../repositorys';
import { create_group_member } from '../../interfaces';
import { groupMemberRole } from '../../enum';
const groupMemberRepo = new GroupMemberRepository();

const get_group_member_of_user_use = async (id: string) => {
    try {
        const groupMembersData =
            await groupMemberRepo.find_group_member_of_user(id);
        if (!groupMembersData?.success) {
            throw new Error(`${groupMembersData?.message}`);
        }
        return {
            success: true,
            data: groupMembersData?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
const find_group_of_member = async (id: string) => {
    try {
        const groupMembersData = await groupMemberRepo.find_group_member(id);
        if (!groupMembersData?.success) {
            throw new Error(`${groupMembersData?.message}`);
        }
        return {
            success: true,
            data: groupMembersData?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const create_groupMember = async (data: create_group_member) => {
    try {
        if (!data || !data.conversation_id || !data.role || !data.user_id) {
            throw new Error('Invalid data create group member');
        }
        if (!Object.values(groupMemberRole).includes(data.role)) {
            throw new Error('Invalid role');
        }
        const date = moment().tz('Asia/Tokyo');
        const new_group = await groupMemberRepo.create_group_member({
            ...data,
            joined_at: date.format('YYYY-MM-DD HH:mm:ss'),
        });
        if (!new_group?.success) {
            throw new Error(`${new_group?.message}`);
        }
        return {
            success: true,
            data: new_group?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_user_by_conversation_id_use = async (id: string) => {
    try {
        const users = await groupMemberRepo.find_user_by_conversation_id(id);
        if (!users?.success) {
            throw new Error(`${users?.message}`);
        }
        return {
            success: true,
            data: users?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export {
    find_group_of_member,
    create_groupMember,
    get_group_member_of_user_use,
    find_user_by_conversation_id_use,
};
