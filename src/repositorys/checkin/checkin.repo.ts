import { Checkin, Department, User } from '../../models';
import moment from 'moment-timezone';
import { Op } from 'sequelize';
import { ICheckinRepository } from '../interfaces/checkin/ICheckinRepository.interface';

class CheckinRepository implements ICheckinRepository {
    async create_checkin(data: any) {
        try {
            const create_value_checkin: Checkin | null = await Checkin.create({
                ...data,
            });
            if (create_value_checkin == null) {
                throw new Error('create checkin not success');
            }
            return {
                success: true,
                data: create_value_checkin,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async update_checkin(field: any) {
        try {
            const update_value_checkin = await Checkin.update(
                {
                    time_out: field.time_out,
                    over_time: field.over_time,
                    work_time: field.work_time,
                    is_checked: field.is_checked,
                },
                {
                    where: {
                        user_id: field.user_id,
                        date: field.date,
                        work_shift: field.work_shift,
                    },
                },
            );
            if (update_value_checkin[0] < 1) {
                throw new Error(`update failded`);
            }
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async isChecked(field: any) {
        try {
            const is_checked: Checkin | null = await Checkin.findOne({
                where: {
                    ...field,
                },
            });
            if (is_checked === null) {
                throw new Error(`not checked`);
            }
            return {
                success: true,
                data: is_checked,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async search_checkin_of_user_in_month(field: any) {
        try {
            const startDate = moment(
                `${field.year}-${field.month}-01`,
                'YYYY-MM-DD',
            ).format('YYYY-MM-DD');
            const endDate = moment(startDate, 'YYYY-MM-DD')
                .endOf('month')
                .format('YYYY-MM-DD');
            const checkins: Checkin[] | null = await Checkin.findAll({
                where: {
                    user_id: field.user_id,
                    date: {
                        [Op.gte]: startDate,
                        [Op.lte]: endDate,
                    },
                },
                attributes: [
                    'id',
                    'date',
                    'user_id',
                    'time_in',
                    'work_shift',
                    'time_out',
                    'work_time',
                    'over_time',
                    'is_weekend',
                    'is_paid_leave',
                ],
                include: [
                    {
                        model: User,
                        attributes: ['id', 'name', 'employee_id'],
                        include: [
                            {
                                model: Department,
                                as: 'department',
                                attributes: ['name'],
                            },
                        ],
                    },
                ],
            });

            if (checkins === null || checkins.length < 1) {
                throw new Error(`user not have data checkin this month`);
            }
            return {
                success: true,
                data: checkins,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async get_checkin_detail_in_date_of_user_repo(filed: any) {
        try {
            const checkin_detail: Checkin | null = await Checkin.findOne({
                where: { ...filed },
                attributes: [
                    'id',
                    'date',
                    'user_id',
                    'time_in',
                    'work_shift',
                    'time_out',
                    'work_time',
                    'over_time',
                    'is_weekend',
                    'is_paid_leave',
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            'name',
                            'role',
                            'employee_id',
                            'position',
                            'avatar',
                        ],
                        include: [
                            {
                                model: Department,
                                as: 'department',
                                attributes: ['name'],
                            },
                        ],
                    },
                ],
            });
            if (checkin_detail === null) {
                throw new Error(`data not found`);
            }
            return {
                success: true,
                data: checkin_detail,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async get_checkin_of_position_in_date_repo(field: any) {
        try {
            const checkins: Checkin[] | null = await Checkin.findAll({
                where: {
                    date: field.date,
                },
                attributes: [
                    'user_id',
                    'date',
                    'work_shift',
                    'work_time',
                    'over_time',
                    'time_in',
                    'time_out',
                    'is_weekend',
                    'is_paid_leave',
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            'name',
                            'role',
                            'employee_id',
                            'position',
                            'avatar',
                        ],
                        include: [
                            {
                                model: Department,
                                as: 'department',
                                attributes: ['name'],
                            },
                        ],
                        where: {
                            position: field.position,
                        },
                    },
                ],
            });
            if (checkins === null || checkins.length < 1) {
                throw new Error(`user not have data checkin this month`);
            }
            return {
                success: true,
                data: checkins,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
}

export default CheckinRepository;
