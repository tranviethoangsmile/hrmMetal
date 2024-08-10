import { CodeError, DailyReport, User } from '../../models';
import { Department } from '../../models';
import { IDailyReportRepository } from '../interfaces';
class DailyReportRepository implements IDailyReportRepository {
    async daily_report_create(data: any) {
        try {
            const new_daily_report: DailyReport | null =
                await DailyReport.create({
                    ...data,
                });
            if (new_daily_report === null) {
                throw new Error('creating daily report error');
            }
            return {
                success: true,
                data: new_daily_report,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `${error?.message} repo`,
            };
        }
    }

    async find_report(field: any) {
        try {
            const reports: DailyReport[] | null = await DailyReport.findAll({
                where: {
                    ...field,
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
            if (reports === null || reports.length < 1) {
                throw new Error('find daily report not found or error');
            }
            return {
                success: true,
                data: reports,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async find_all_report_of_department(field: any) {
        try {
            const reports: DailyReport[] | null = await DailyReport.findAll({
                where: {
                    ...field,
                },
                order: [['date', 'DESC']],
                limit: 7,
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
            if (reports === null || reports.length < 1) {
                throw new Error('report not found or error');
            }
            return {
                success: true,
                data: reports,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }

    async find_daily_report_by_id(id: any) {
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

            if (report === null) {
                throw new Error('daily report not found');
            }
            return {
                success: true,
                data: report,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }
}
export default DailyReportRepository;
