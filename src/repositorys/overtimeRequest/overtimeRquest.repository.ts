import { OvertimeRequest, User, Department } from '../../models';
import { IOvertimeRequestRepo } from '../interfaces/overtimeRquest/IOvertimeRequest.interface';

const isAttributes = [
    'id',
    'user_id',
    'department_id',
    'leader_id',
    'description',
    'is_confirm',
    'is_approved',
];
class OvertimeRequestRepository implements IOvertimeRequestRepo {
    async CREATE(data: any) {
        try {
            const new_overtime_request: OvertimeRequest | null =
                await OvertimeRequest.create(data);
            if (!new_overtime_request) {
                throw new Error('CREATE OVERTIME REQUEST FAILED');
            }
            return {
                success: true,
                data: new_overtime_request,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repository error:${error?.message}`,
            };
        }
    }

    async GET_ALL() {
        try {
            const overtime_requests: OvertimeRequest[] =
                await OvertimeRequest.findAll({
                    where: {
                        is_confirm: true,
                        is_approved: false,
                    },
                    attributes: isAttributes,
                    include: [
                        {
                            model: User,
                            as: 'userDetail',
                            attributes: ['id', 'name', 'avatar'],
                        },
                        {
                            model: User,
                            as: 'leaderDetail',
                            attributes: ['id', 'name'],
                        },
                        {
                            model: Department,
                            as: 'departmentDetail',
                            attributes: ['name'],
                        },
                    ],
                    order: [['created_at', 'DESC']],
                });
            if (overtime_requests.length === 0) {
                throw new Error('No overtime requests found');
            }
            return {
                success: true,
                data: overtime_requests,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repository error:${error?.message}`,
            };
        }
    }

    async GET_BY_ID(id: string) {
        try {
            const overtime_request: OvertimeRequest | null =
                await OvertimeRequest.findByPk(id, {
                    attributes: isAttributes,
                    include: [
                        {
                            model: User,
                            as: 'userDetail',
                            attributes: ['id', 'name', 'avatar'],
                        },
                        {
                            model: User,
                            as: 'leaderDetail',
                            attributes: ['id', 'name'],
                        },
                        {
                            model: Department,
                            as: 'departmentDetail',
                            attributes: ['name'],
                        },
                    ],
                });
            if (overtime_request === null) {
                throw new Error('Overtime request not found');
            }
            return {
                success: true,
                data: overtime_request,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repository error:${error?.message}`,
            };
        }
    }

    async UPDATE_CONFIRM(data: any) {
        try {
            const result = await OvertimeRequest.update(
                {
                    is_confirm: true,
                },
                {
                    where: {
                        id: data.id,
                    },
                },
            );
            if (result[0] === 0) {
                throw new Error('Update failed');
            }
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repository error:${error?.message}`,
            };
        }
    }

    async DELETE_BY_ID(id: string) {
        try {
            const result = await OvertimeRequest.destroy({
                where: {
                    id,
                },
            });
            if (result === 0) {
                throw new Error('Delete failed');
            }
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repository error:${error?.message}`,
            };
        }
    }
}

export default OvertimeRequestRepository;
