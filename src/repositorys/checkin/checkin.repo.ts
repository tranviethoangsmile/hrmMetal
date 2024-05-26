import { Checkin, Department, User } from '../../models';
import moment from 'moment-timezone';
import { Op } from 'sequelize';

const get_checkin_detail_in_date_of_user_repo = async (filed: any) => {
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
        if (checkin_detail != null) {
            return {
                success: true,
                data: checkin_detail,
            };
        } else {
            return {
                success: false,
                message: 'No Data Found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const create_checkin = async (data: any) => {
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
};

const update_checkin = async (field: any) => {
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
        if (update_value_checkin[0] > 0) {
            return {
                success: true,
                data: `Update ${update_value_checkin[0]} record`,
            };
        } else {
            return {
                success: false,
                message: 'update false',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const isChecked = async (field: any) => {
    try {
        const is_checked: Checkin | null = await Checkin.findOne({
            where: {
                ...field,
            },
        });
        if (is_checked != null) {
            return {
                success: true,
                data: is_checked,
            };
        } else {
            return {
                success: false,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const search_checkin_of_user_in_month = async (field: any) => {
    try {
        const startDate = moment(
            `${field.year}-${field.month}-01`,
            'YYYY-MM-DD',
        ).format('YYYY-MM-DD');
        const endDate = moment(startDate, 'YYYY-MM-DD')
            .endOf('month')
            .format('YYYY-MM-DD');
        const checkins: Array<Checkin> | null = await Checkin.findAll({
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

        if (checkins != null && checkins.length > 0) {
            return {
                success: true,
                data: checkins,
            };
        } else {
            return {
                success: false,
                message: 'user_no_check_ins',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const get_checkin_of_position_in_date_repo = async (field: any) => {
    try {
        const checkins: Array<Checkin> | null = await Checkin.findAll({
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
        if (checkins != null && checkins.length > 0) {
            return {
                success: true,
                data: checkins,
            };
        } else {
            return {
                success: false,
                message: 'checkin not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

export {
    create_checkin,
    update_checkin,
    isChecked,
    search_checkin_of_user_in_month,
    get_checkin_of_position_in_date_repo,
    get_checkin_detail_in_date_of_user_repo,
};
