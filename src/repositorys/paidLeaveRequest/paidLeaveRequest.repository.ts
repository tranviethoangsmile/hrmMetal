import { Department, PaidLeaveRequest, User } from '../../models';

const get_paid_lead_with_id_repo = async (id: string) => {
    try {
        const paid_leave: PaidLeaveRequest | null =
            await PaidLeaveRequest.findOne({
                where: { id: id },
            });
        if (paid_leave === null) {
            throw new Error('Paid leave not exist');
        }
        return {
            success: true,
            data: paid_leave,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const create_paid_leave_request = async (data: any) => {
    try {
        const paid_leave_request: PaidLeaveRequest | null =
            await PaidLeaveRequest.create({ ...data });
        if (paid_leave_request != null) {
            return {
                success: true,
                data: paid_leave_request,
            };
        } else {
            return {
                success: false,
                message: 'create paid leave request failed',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const search_leave_request_with_field_repo = async (field: any) => {
    try {
        const leaves: PaidLeaveRequest[] | null =
            await PaidLeaveRequest.findAll({
                where: { ...field },
                attributes: [
                    'id',
                    'date_leave',
                    'reason',
                    'is_approve',
                    'user_id',
                    'leader_id',
                    'is_confirm',
                    'date_request',
                    'position',
                    'is_paid',
                    'is_half',
                    'feedback',
                ],
                include: [
                    {
                        model: User,
                        as: 'staff',
                        attributes: ['id', 'name'],
                        include: [
                            {
                                model: Department,
                                as: 'department',
                                attributes: ['id', 'name'],
                            },
                        ],
                    },
                    {
                        model: User,
                        as: 'leader',
                        attributes: ['id', 'name'],
                        include: [
                            {
                                model: Department,
                                as: 'department',
                                attributes: ['id', 'name'],
                            },
                        ],
                    },
                ],
            });
        if (leaves != null) {
            return {
                success: true,
                data: leaves,
            };
        } else {
            return {
                success: false,
                message: 'leave not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_all_paid_leave = async () => {
    try {
        const paid_leave_requests: PaidLeaveRequest[] | null =
            await PaidLeaveRequest.findAll({
                attributes: ['id', 'date', 'reason', 'is_active'],
                include: [
                    {
                        model: User,
                        as: 'staff',
                        attributes: ['id', 'name'],
                        include: [
                            {
                                model: Department,
                                as: 'department',
                                attributes: ['id', 'name'],
                            },
                        ],
                    },
                    {
                        model: User,
                        as: 'leader',
                        attributes: ['id', 'name'],
                        include: [
                            {
                                model: Department,
                                as: 'department',
                                attributes: ['id', 'name'],
                            },
                        ],
                    },
                ],
            });

        if (paid_leave_requests != null) {
            return {
                success: true,
                data: paid_leave_requests,
            };
        } else {
            return {
                success: false,
                message: 'find all paid leave failed',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const update_active_paid_leave = async (id: any) => {
    try {
        const update_paid_leave = await PaidLeaveRequest.update(
            { is_approve: true },
            {
                where: {
                    id: id,
                },
            },
        );

        if (update_paid_leave.toString() === '1') {
            return {
                success: true,
                message: 'updated paid leave',
            };
        } else {
            throw new Error('failed');
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
const update_un_approve_leave_request_repo = async (field: any) => {
    try {
        const update_feelback_request = await PaidLeaveRequest.update(
            {
                ...field,
                is_approve: false,
            },
            {
                where: { id: field.id },
            },
        );
        if (update_feelback_request.toString() === '1') {
            return {
                success: true,
                message: 'update paid leave success',
            };
        } else {
            throw new Error('failed');
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const update_confirm_from_admin_paid_leave_request_repo = async (
    field: any,
) => {
    try {
        const update_confirm = await PaidLeaveRequest.update(
            {
                ...field,
                is_confirm: true,
            },
            {
                where: {
                    id: field.id,
                },
            },
        );
        if (update_confirm.toString() === '1') {
            return {
                success: true,
                message: 'update paid leave success',
            };
        } else {
            throw new Error('failed');
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
export {
    create_paid_leave_request,
    find_all_paid_leave,
    update_active_paid_leave,
    search_leave_request_with_field_repo,
    update_un_approve_leave_request_repo,
    update_confirm_from_admin_paid_leave_request_repo,
    get_paid_lead_with_id_repo,
};
