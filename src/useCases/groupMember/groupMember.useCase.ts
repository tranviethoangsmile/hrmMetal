import {
    find_group_member,
    create_group_member,
} from '../../repositorys/groupMember/groupMember.repo';
import moment from 'moment-timezone';
const find_group_of_member = async (data: any) => {
    try {
        const groupMembersData = await find_group_member({
            ...data,
        });
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
            message: error.messgae,
        };
    }
};

const create_groupMember = async (data: any) => {
    try {
        const date = moment().tz('Asia/Ho_Chi_Minh');
        const new_group = await create_group_member({
            ...data,
            joined_datetime: date.format('YYYY-MM-DD HH:mm:ss'),
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
            message: error.messgae,
        };
    }
};

export { find_group_of_member, create_groupMember };
