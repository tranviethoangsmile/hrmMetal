import { CodeError, DailyReport, User } from '../../models';
import Department from '../../models/department.model';
const { Op } = require('sequelize');
const moment = require('moment');
const daily_report_create = async (data: any) => {
    try {
        const new_daily_report: DailyReport | null = await DailyReport.create({
            ...data,
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
    } catch (error: any) {
        return {
            success: false,
            message: `${error?.message} repo`,
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
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const find_all_report_of_department = async (field: any) => {
    try {
        const startDate = moment().subtract(7, 'days').toDate(); // Ngày bắt đầu: ngày hiện tại trừ đi 10 ngày
        const endDate = new Date(); // Ngày kết thúc: ngày hiện tại

        const reports: DailyReport[] | null = await DailyReport.findAll({
            where: {
                ...field,
                date: {
                    [Op.between]: [startDate, endDate], // Chỉ lấy các báo cáo trong khoảng ngày này đến ngày kết thúc
                },
            },
            attributes: [
                'product',
                'date',
                'user_id',
                'shift',
                'quantity',
                'operated_time',
                'shutdown_time',
                'operator_history',
                'department_id',
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
            ],
        });
        if (reports != null) {
            return {
                success: true,
                data: reports,
            };
        } else {
            throw new Error('No report found');
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
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
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
            ],
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
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export {
    daily_report_create,
    find_daily_report_by_id,
    find_all_report_of_department,
    find_report,
};
