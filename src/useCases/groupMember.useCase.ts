import {
    find_group_member,
    create_group_member,
} from '../repositorys/groupMember.repo';
import moment from 'moment-timezone';
const find_group_of_member = async (data: any) => {
    try {
        const groupMembersData = await find_group_member({
            ...data,
        });
        if (groupMembersData?.success) {
            return {
                success: true,
                data: groupMembersData?.data,
            };
        } else {
            return {
                success: false,
                message: groupMembersData?.message,
            };
        }
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
        if (new_group?.success) {
            return {
                success: new_group?.success,
                data: new_group?.data,
            };
        } else {
            return {
                success: new_group?.success,
                message: new_group?.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.messgae,
        };
    }
};

export { find_group_of_member, create_groupMember };
