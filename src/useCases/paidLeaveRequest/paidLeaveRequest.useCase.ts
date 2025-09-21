import {
    validate_create_paid,
    validate_update_paid,
    validate_search_paid,
    validation_id,
    validate_delete_paid_leave,
} from '../../validates';
import {
    CheckinRepository,
    PaidLeaveRequestRepository,
} from '../../repositorys';
const paidLeaveRequestRepository = new PaidLeaveRequestRepository();

const checkinRepository = new CheckinRepository();
const update_confirm_from_admin_paid_leave_request_use = async (field: any) => {
    try {
        const isValid = validate_update_paid(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const pail_leave =
            await paidLeaveRequestRepository.GET_PAID_LEAVE_REQUEST_BY_ID(
                field.id,
            );

        if (!pail_leave?.success) {
            throw new Error(pail_leave?.message);
        }
        const checkin_field = {
            user_id: pail_leave?.data?.user_id,
            date: pail_leave?.data?.date_leave,
            is_paid_leave: true,
        };
        const checkin = await checkinRepository.create_checkin(checkin_field);
        if (!checkin?.success) {
            throw new Error(checkin?.message);
        }
        const update_confirm =
            await paidLeaveRequestRepository.UPDATE_CONFIRM_PAID_LEAVE_REQUEST_FROM_ADMIN(
                field,
            );
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
const update_un_approve_leave_request_use = async (field: any) => {
    try {
        const isValid = validate_update_paid(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const update =
            await paidLeaveRequestRepository.UPDATE_UN_APPROVE_PAID_LEAVE_REQUEST(
                field,
            );
        if (!update?.success) {
            throw new Error(`${update?.message}`);
        }
        return {
            success: true,
            message: update?.message,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
const search_leave_request_with_field_use = async (field: any) => {
    try {
        const isValid = validate_search_paid(field);
        if (isValid.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const leaves =
            await paidLeaveRequestRepository.SEARCH_PAID_LEAVE_REQUEST_WITH_FIELD(
                field,
            );
        if (!leaves?.success) {
            throw new Error(`${leaves?.message}`);
        }
        return { success: true, data: leaves?.data };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
const create_paid_leave = async (data: any) => {
    try {
        const valid = validate_create_paid(data);
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const paid_leave =
            await paidLeaveRequestRepository.CREATE_PAID_LEAVE_REQUEST(data);
        if (!paid_leave.success) {
            throw new Error(`${paid_leave?.message}`);
        }
        return {
            success: true,
            data: paid_leave?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_paid_leave = async () => {
    try {
        const paid_leaves =
            await paidLeaveRequestRepository.FIND_ALL_PAID_LEAVE_REQUEST();
        if (!paid_leaves.success) {
            throw new Error(`${paid_leaves?.message}`);
        }
        return {
            success: true,
            data: paid_leaves?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const update_paid_leave = async (data: any) => {
    try {
        const valid = validate_update_paid(data);
        if (valid?.error) {
            throw new Error(valid?.error.message);
        }
        const paid_leave =
            await paidLeaveRequestRepository.UPDATE_ACTIVE_PAID_LEAVE_REQUEST(
                data.id,
            );
        if (!paid_leave?.success) {
            throw new Error(`${paid_leave?.message}`);
        }
        return {
            success: true,
            message: paid_leave?.message,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const delete_paid_leave_request_with_by_id_use = async (delete_value: any) => {
    try {
        const isValid = validate_delete_paid_leave(delete_value);
        if (isValid?.error) {
            throw new Error(`${isValid?.error.message}`);
        }
        const paid_leave =
            await paidLeaveRequestRepository.GET_PAID_LEAVE_REQUEST_BY_ID(
                delete_value.id,
            );
        if (!paid_leave?.success) {
            throw new Error(paid_leave?.message);
        }
        if (paid_leave?.data?.user_id !== delete_value.user_id) {
            throw new Error('You do not have permission to delete this item');
        }
        const delete_paid_leave =
            await paidLeaveRequestRepository.DELETE_PAID_LEAVE_REQUEST_BY_ID_REPO(
                delete_value.id,
            );
        if (!delete_paid_leave?.success) {
            throw new Error(`${delete_paid_leave?.message}`);
        }
        return {
            success: true,
        };
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
    delete_paid_leave_request_with_by_id_use,
};
