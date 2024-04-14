import {
    create_paid_leave_request,
    find_all_paid_leave,
    update_active_paid_leave,
    search_leave_request_with_field_repo,
    update_un_approve_leave_request_repo,
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

export {
    create_paid_leave,
    find_paid_leave,
    update_paid_leave,
    search_leave_request_with_field_use,
    update_un_approve_leave_request_use,
};
