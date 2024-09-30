import { create_group_member } from '../../../interfaces';
import { GroupMember } from '../../../models';

export interface IGroupMemberRepository {
    create_group_member(data: create_group_member): Promise<{
        success: boolean;
        data?: GroupMember;
        message?: string;
    }>;
    find_group_member(id: string): Promise<{
        success: boolean;
        data?: GroupMember[];
        message?: string;
    }>;

    find_group_member_of_user(id: string): Promise<{
        success: boolean;
        data?: GroupMember[];
        message?: string;
    }>;

    find_user_by_conversation_id(id: string): Promise<{
        success: boolean;
        data?: GroupMember[];
        message?: string;
    }>;
}
