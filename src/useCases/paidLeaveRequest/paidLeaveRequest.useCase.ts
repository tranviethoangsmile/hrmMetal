import {
    create_paid_leave_request,
    find_all_paid_leave,
    update_active_paid_leave,
} from '../../repositorys/paidLeaveRequest/paidLeaveRequest.repository';
import {
    create,
    update,
} from '../../interfaces/paiLeaveRequest/paidLeaveRequest.interface';
import {
    validate_create,
    validate_update,
} from '../../validates/paidLeaveRequest/paidLeaveRequest.validate';
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

export { create_paid_leave, find_paid_leave, update_paid_leave };
