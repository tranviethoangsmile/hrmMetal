import {
    create_checkin,
    update_checkin,
    isChecked,
} from '../../repositorys/checkin/checkin.repo';
import {
    create_checkin_interface,
    update_checkin_interface,
    is_Checked_interface,
} from '../../interfaces/checkin/checkin.interface';
import {
    create_checkin_validate,
    update_checkin_validate,
} from '../../validates/checkin/checkin.validate';
const is_checked = async (field: is_Checked_interface) => {
    try {
        const is_check = await isChecked(field);
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
            const result_create = await create_checkin(data);
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
        const valid = update_checkin_validate(field);
        if (!valid?.error) {
            const result_update = await update_checkin({ ...field });
            if (result_update?.success) {
                return {
                    success: result_update?.success,
                    data: result_update?.data,
                    message: result_update?.message,
                };
            } else {
                return {
                    success: result_update?.success,
                    message: result_update?.message,
                };
            }
        } else {
            return {
                success: false,
                message: valid?.error?.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

export { create_checkin_use, update_checkin_use, is_checked };
