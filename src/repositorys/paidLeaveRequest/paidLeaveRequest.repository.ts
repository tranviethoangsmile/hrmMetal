import { Department, PaidLeaveRequest, User } from '../../models';

import { IPaidLeaveRequestRepo } from '../interfaces/paidLeaveRequest/IPaidLeaveRequestRepo';

class PaidLeaveRequestRepository implements IPaidLeaveRequestRepo {
    async get_paid_lead_with_id_repo(id: string) {
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
    }

    async create_paid_leave_request(data: any) {
        try {
            const paid_leave_request: PaidLeaveRequest | null =
                await PaidLeaveRequest.create({ ...data });
            if (paid_leave_request === null) {
                throw new Error(`create paid leave request failed`);
            }
            return {
                success: true,
                data: paid_leave_request,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async search_leave_request_with_field_repo(field: any) {
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
            if (leaves === null || leaves.length < 1) {
                throw new Error(`data not found`);
            }
            return {
                success: true,
                data: leaves,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async find_all_paid_leave() {
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

            if (
                paid_leave_requests === null ||
                paid_leave_requests.length < 1
            ) {
                throw new Error(`data not found`);
            }
            return {
                success: true,
                data: paid_leave_requests,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async update_active_paid_leave(id: any) {
        try {
            const update_paid_leave = await PaidLeaveRequest.update(
                { is_approve: true },
                {
                    where: {
                        id: id,
                    },
                },
            );

            if (update_paid_leave.toString() !== '1') {
                throw new Error('failed');
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
    }
    async update_un_approve_leave_request_repo(field: any) {
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
            if (update_feelback_request.toString() !== '1') {
                throw new Error('update failed');
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
    }

    async update_confirm_from_admin_paid_leave_request_repo(field: any) {
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
            if (update_confirm.toString() !== '1') {
                throw new Error('failed');
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
    }
}
export default PaidLeaveRequestRepository;
