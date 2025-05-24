import {
    validate_create_paid,
    validate_update_paid,
    validate_search_paid,
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
            await paidLeaveRequestRepository.get_paid_lead_with_id_repo(
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
            await paidLeaveRequestRepository.update_confirm_from_admin_paid_leave_request_repo(
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
            await paidLeaveRequestRepository.update_un_approve_leave_request_repo(
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
            await paidLeaveRequestRepository.search_leave_request_with_field_repo(
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
            await paidLeaveRequestRepository.create_paid_leave_request(data);
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
            await paidLeaveRequestRepository.find_all_paid_leave();
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
            await paidLeaveRequestRepository.update_active_paid_leave(data.id);
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

export {
    create_paid_leave,
    find_paid_leave,
    update_paid_leave,
    search_leave_request_with_field_use,
    update_un_approve_leave_request_use,
    update_confirm_from_admin_paid_leave_request_use,
};
