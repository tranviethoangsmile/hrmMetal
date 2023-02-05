import { CodeError, DailyReport, User } from '../models';
import { userFindById } from './user.repository';
import Department from '../models/department.model';

const daily_report_create = async (data: any) => {
    try {
        const user = await userFindById(data.user_id);
        if (user?.success) {
            const new_daily_report: DailyReport | null =
                await DailyReport.create({
                    ...data,
                    user,
                });
            if (new_daily_report != null) {
                return {
                    success: true,
                    data: new_daily_report,
                };
            } else {
                return {
                    success: false,
                    message: 'create daily report failed',
                };
            }
        } else {
            return {
                success: false,
                message: 'user not found in daily report',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const find_report = async (data: any) => {
    try {
        const reports: DailyReport[] | null = await DailyReport.findAll({
            where: {
                ...data,
            },
            attributes: [
                'product',
                'date',
                'shift',
                'quantity',
                'operated_time',
                'shutdown_time',
                'active_time',
                'operator_history',
            ],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
                {
                    model: CodeError,
                    attributes: [
                        'code',
                        'description',
                        'shutdown_time',
                        'daily_report_id',
                    ],
                },
            ],
        });
        if (reports != null) {
            return {
                success: true,
                data: reports,
            };
        } else {
            return {
                success: false,
                message: 'daily report not found',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const find_report_all = async () => {
    try {
        const reports: DailyReport[] | null = await DailyReport.findAll({
            attributes: [
                'product',
                'date',
                'shift',
                'quantity',
                'operated_time',
                'shutdown_time',
                'active_time',
                'operator_history',
            ],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
                {
                    model: CodeError,
                    attributes: [
                        'code',
                        'description',
                        'shutdown_time',
                        'daily_report_id',
                    ],
                },
            ],
        });
        if (reports != null) {
            return {
                success: true,
                data: reports,
            };
        } else {
            return {
                success: false,
                message: 'daily report not found',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const find_daily_report_by_id = async (id: any) => {
    try {
        const report: DailyReport | null = await DailyReport.findOne({
            where: {
                id: id,
            },
            attributes: [
                'product',
                'date',
                'shift',
                'quantity',
                'operator_history',
                'operated_time',
                'shutdown_time',
                'active_time',
            ],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                    as: 'user',
                    include: [
                        {
                            model: Department,
                            as:'department',
                            attributes: ['name'],
                        }
                    ]
                }
            ]
        });

        if (report != null) {
            return {
                success: true,
                data: report,
            };
        } else {
            return {
                success: false,
                message: 'Report not found',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

export {
    daily_report_create,
    find_daily_report_by_id,
    find_report_all,
    find_report,
};
