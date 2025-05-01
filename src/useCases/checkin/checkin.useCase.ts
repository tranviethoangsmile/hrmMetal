import moment from 'moment-timezone';
import { CheckinRepository } from '../../repositorys';
import {
    create_checkin_interface,
    update_checkin_interface,
    is_Checked_interface,
    get_checkin_in_date_of_position_interface,
} from '../../interfaces';
import {
    validation_id,
    create_checkin_validate,
    update_checkin_validate,
    get_checkin_in_date_of_position_validate,
    get_checkin_detail_in_day_of_user_validate,
} from '../../validates';
import { shift_work } from '../../enum';
const checkinRepository = new CheckinRepository();

const get_checkin_detail_in_date_of_user_use = async (
    field: is_Checked_interface,
) => {
    try {
        const isValid = get_checkin_detail_in_day_of_user_validate(field);
        if (isValid.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const checkin_detail =
            await checkinRepository.get_checkin_detail_in_date_of_user_repo(
                field,
            );
        if (!checkin_detail?.success) {
            throw new Error(`${checkin_detail?.message}`);
        }
        return {
            success: true,
            data: checkin_detail?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};
const is_checked = async (field: is_Checked_interface) => {
    try {
        const is_check = await checkinRepository.isChecked(field);
        if (!is_check?.success) {
            throw new Error(`${is_check?.message}`);
        }
        return {
            success: true,
            data: is_check?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};
const create_checkin_use = async (data: create_checkin_interface) => {
    try {
        const valid = create_checkin_validate(data);
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        if (!Object.keys(shift_work).includes(data.work_shift)) {
            throw new Error(`shift work not avaliable`);
        }
        const result_create = await checkinRepository.create_checkin(data);
        if (!result_create?.success) {
            throw new Error(`${result_create?.message}`);
        }
        return {
            success: true,
            data: result_create?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const update_checkin_use = async (field: update_checkin_interface) => {
    try {
        const isValid = update_checkin_validate(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        if (!Object.keys(shift_work).includes(field.work_shift)) {
            throw new Error(`shift work not avaliable`);
        }
        const result_update = await checkinRepository.update_checkin({
            ...field,
        });
        if (!result_update?.success) {
            throw new Error(`${result_update?.message}`);
        }
        return {
            success: result_update?.success,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const search_checkin_of_user_in_month_useCase = async (
    field: is_Checked_interface,
) => {
    try {
        const isIdValid = validation_id(field.user_id);
        if (isIdValid.error) {
            throw new Error(`${isIdValid?.error.message}`);
        }
        const checkins =
            await checkinRepository.search_checkin_of_user_in_month({
                user_id: field.user_id,
                year: moment(field.date).format('yyyy'),
                month: moment(field.date).format('MM'),
            });
        if (!checkins?.success) {
            throw new Error(`${checkins?.message}`);
        }
        return {
            success: true,
            data: checkins?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};
const get_checkin_of_position_in_date_use = async (
    field: get_checkin_in_date_of_position_interface,
) => {
    try {
        const isValid = get_checkin_in_date_of_position_validate(field);
        if (isValid.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const checkins =
            await checkinRepository.get_checkin_of_position_in_date_repo(field);
        if (!checkins?.success) {
            throw new Error(`${checkins?.message}`);
        }
        return {
            success: true,
            data: checkins?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

export {
    create_checkin_use,
    update_checkin_use,
    is_checked,
    search_checkin_of_user_in_month_useCase,
    get_checkin_of_position_in_date_use,
    get_checkin_detail_in_date_of_user_use,
};
