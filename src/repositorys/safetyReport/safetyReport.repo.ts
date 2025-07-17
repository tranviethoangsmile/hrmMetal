import { SafetyReport } from '../../models';
import { ISafetyReport } from '../interfaces';
import moment from 'moment-timezone';
import { Op } from 'sequelize';

class SafetyReportRepository implements ISafetyReport {
    async CREATE(field: any) {
        try {
            const safetyReport: SafetyReport | null = await SafetyReport.create(
                {
                    ...field,
                },
            );

            if (safetyReport === null) {
                throw new Error(`create safetyReport not successfully`);
            }

            return {
                success: true,
                data: safetyReport,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async UPDATE(field: any) {
        try {
            const result = await SafetyReport.update(field, {
                where: {
                    id: field.id,
                },
            });

            if (result[0] < 1) {
                throw new Error(`update safetyReport not successfully`);
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

    async CONFIRM(field: any) {
        try {
            const result = await SafetyReport.update(
                {
                    leader_id: field.leader_id,
                    is_confirm: true,
                    corrective_action: field.corrective_action,
                },
                {
                    where: {
                        id: field.id,
                    },
                },
            );
            if (result[0] < 1) {
                throw new Error(`confirm safetyReport not successfully`);
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

    async GET_BY_ID(id: string) {
        try {
            const safetyReport: SafetyReport | null =
                await SafetyReport.findByPk(id);

            if (safetyReport === null) {
                throw new Error(`safetyReport not found`);
            }

            return {
                success: true,
                data: safetyReport,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async DELETE(id: string) {
        try {
            const result = await SafetyReport.destroy({
                where: {
                    id: id,
                },
            });

            if (result < 1) {
                throw new Error(`delete safetyReport not successfully`);
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

    async GET_ALL_BY_USER_ID(field: any) {
        try {
            const startDate = moment(
                `${field.year}-${field.month}-01`,
                'YYYY-MM-DD',
            ).format('YYYY-MM-DD');
            const endDate = moment(startDate, 'YYYY-MM-DD')
                .endOf('month')
                .format('YYYY-MM-DD');
            const safetyReports: SafetyReport[] | null =
                await SafetyReport.findAll({
                    where: {
                        user_id: field.user_id,
                        date: {
                            [Op.gte]: startDate,
                            [Op.lte]: endDate,
                        },
                    },
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'is_confirm',
                        'solution',
                        'corrective_action',
                        'media_path',
                        'date',
                        'leader_id',
                        'department_id',
                    ],
                });
            if (safetyReports === null || safetyReports.length < 1) {
                throw new Error(`safetyReport not found`);
            }
            return {
                success: true,
                data: safetyReports,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async GET_ALL_BY_DEPARTMENT_ID(id: string) {
        try {
            const safetyReports: SafetyReport[] | null =
                await SafetyReport.findAll({
                    where: {
                        department_id: id,
                        is_confirm: false,
                    },
                });
            if (safetyReports === null || safetyReports.length < 1) {
                throw new Error(`safetyReport not found`);
            }
            return {
                success: true,
                data: safetyReports,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
}

export default SafetyReportRepository;
