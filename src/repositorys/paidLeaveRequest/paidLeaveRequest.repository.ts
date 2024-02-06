import { Department, PaidLeaveRequest, User } from '../../models';

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
            { is_active: true },
            {
                where: {
                    id: id,
                },
            },
        );
        console.log(update_paid_leave);
        if (update_paid_leave.toString() === '1') {
            const paid_leave_result: PaidLeaveRequest | null =
                await PaidLeaveRequest.findByPk(id, {
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
            if (paid_leave_result != null) {
                return {
                    success: true,
                    data: paid_leave_result,
                };
            } else {
                return {
                    success: true,
                    data: null,
                };
            }
        } else {
            return {
                success: false,
                message: 'update paid leave failed',
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
    create_paid_leave_request,
    find_all_paid_leave,
    update_active_paid_leave,
};
