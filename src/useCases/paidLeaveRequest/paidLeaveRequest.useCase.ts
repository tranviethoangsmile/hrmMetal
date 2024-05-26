import {
    create_paid_leave_request,
    find_all_paid_leave,
    update_active_paid_leave,
    search_leave_request_with_field_repo,
    update_un_approve_leave_request_repo,
    update_confirm_from_admin_paid_leave_request_repo,
    get_paid_lead_with_id_repo,
} from '../../repositorys/paidLeaveRequest/paidLeaveRequest.repository';
import {
    create,
    update,
    search,
} from '../../interfaces/paiLeaveRequest/paidLeaveRequest.interface';
import {
    validate_create,
    validate_update,
    validate_search,
} from '../../validates/paidLeaveRequest/paidLeaveRequest.validate';
import { create_checkin } from '../../repositorys/checkin/checkin.repo';
const update_confirm_from_admin_paid_leave_request_use = async (field: any) => {
    try {
        const pail_leave = await get_paid_lead_with_id_repo(field.id);

        if (!pail_leave?.success) {
            throw new Error(pail_leave?.message);
        }
        const checkin_field = {
            user_id: pail_leave?.data?.user_id,
            date: pail_leave?.data?.date_leave,
            is_paid_leave: true,
        };
        console.log(checkin_field);
        const checkin = await create_checkin(checkin_field);
        if (!checkin?.success) {
            throw new Error(checkin?.message);
        }
        const update_confirm =
            await update_confirm_from_admin_paid_leave_request_repo(field);
        if (!update_confirm.success) {
            throw new Error(update_confirm?.message);
        }
        return {
            success: true,
            message: update_confirm?.message,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};
const update_un_approve_leave_request_use = async (field: update) => {
    try {
        const isValid = validate_update(field);
        if (!isValid?.error) {
            const update = await update_un_approve_leave_request_repo(field);
            if (update?.success) {
                return {
                    success: true,
                    message: update?.message,
                };
            } else {
                return {
                    success: false,
                    message: update?.message,
                };
            }
        } else {
            return {
                success: false,
                message: isValid?.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
const search_leave_request_with_field_use = async (field: search) => {
    try {
        const isValid = validate_search(field);
        if (!isValid.error) {
            const leaves = await search_leave_request_with_field_repo(field);
            if (leaves?.success) {
                return { success: true, data: leaves?.data };
            } else {
                return { success: false, message: leaves?.message };
            }
        } else {
            return {
                success: false,
                message: isValid?.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
const create_paid_leave = async (data: create) => {
    try {
        const valid = validate_create(data);
        if (!valid.error) {
            const paid_leave = await create_paid_leave_request(data);
            if (paid_leave.success) {
                return {
                    success: true,
                    data: paid_leave?.data,
                };
            } else {
                return {
                    success: false,
                    message: paid_leave?.message,
                };
            }
        } else {
            return {
                success: false,
                message: valid?.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_paid_leave = async () => {
    try {
        const paid_leaves = await find_all_paid_leave();
        if (paid_leaves.success) {
            return {
                success: true,
                data: paid_leaves?.data,
            };
        } else {
            return {
                success: false,
                message: paid_leaves?.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const update_paid_leave = async (data: update) => {
    try {
        const valid = validate_update(data);
        if (!valid?.error) {
            const paid_leave = await update_active_paid_leave(data.id);
            if (paid_leave?.success) {
                return {
                    success: true,
                    message: paid_leave?.message,
                };
            } else {
                throw new Error(paid_leave?.message);
            }
        } else {
            throw new Error(valid?.error?.message);
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export {
    create_paid_leave,
    find_paid_leave,
    update_paid_leave,
    search_leave_request_with_field_use,
    update_un_approve_leave_request_use,
    update_confirm_from_admin_paid_leave_request_use,
};
