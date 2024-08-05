import {
    create_checkin_interface,
    update_checkin_interface,
    is_Checked_interface,
    get_checkin_in_date_of_position_interface,
} from '../../interfaces/checkin/checkin.interface';
import { validation_id } from '../../validates';
import {
    create_checkin_validate,
    update_checkin_validate,
    get_checkin_in_date_of_position_validate,
    get_checkin_detail_in_day_of_user_validate,
} from '../../validates/checkin/checkin.validate';
import { CheckinRepository } from '../../repositorys';
import moment from 'moment-timezone';

const checkinRepository = new CheckinRepository();

const get_checkin_detail_in_date_of_user_use = async (
    field: is_Checked_interface,
) => {
    try {
        const isValid = get_checkin_detail_in_day_of_user_validate(field);
        if (!isValid.error) {
            const checkin_detail =
                await checkinRepository.get_checkin_detail_in_date_of_user_repo(
                    field,
                );
            if (checkin_detail?.success) {
                return {
                    success: checkin_detail?.success,
                    data: checkin_detail?.data,
                };
            } else {
                return {
                    success: checkin_detail?.success,
                    message: checkin_detail?.message,
                };
            }
        } else {
            return {
                success: false,
                message: isValid?.error?.message,
            };
        }
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
        if (is_check?.success) {
            return {
                success: true,
                data: is_check?.data,
            };
        } else {
            return {
                success: false,
                message: is_check?.message,
            };
        }
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
        if (!valid.error) {
            const result_create = await checkinRepository.create_checkin(data);
            if (result_create?.success) {
                return {
                    success: result_create?.success,
                    data: result_create?.data,
                    message: 'Create Check-In Successfully!',
                };
            } else {
                return {
                    success: result_create?.success,
                    message: result_create?.message,
                };
            }
        } else {
            return {
                success: false,
                message: `ERROR: ${valid?.error?.message}`,
            };
        }
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
        if (!isIdValid.error) {
            const checkins =
                await checkinRepository.search_checkin_of_user_in_month({
                    user_id: field.user_id,
                    year: moment(field.date).format('yyyy'),
                    month: moment(field.date).format('MM'),
                });
            if (checkins?.success) {
                return {
                    success: checkins?.success,
                    data: checkins?.data,
                };
            } else {
                return {
                    success: checkins?.success,
                    message: checkins?.message,
                };
            }
        } else {
            return {
                success: false,
                message: isIdValid?.error?.message,
            };
        }
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
        if (!isValid.error) {
            const checkins =
                await checkinRepository.get_checkin_of_position_in_date_repo(
                    field,
                );
            if (checkins?.success) {
                return {
                    success: true,
                    data: checkins?.data,
                };
            } else {
                return {
                    success: false,
                    message: checkins?.message,
                };
            }
        } else {
            return {
                success: false,
                message: isValid?.error?.message,
            };
        }
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
