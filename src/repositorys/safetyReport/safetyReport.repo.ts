import { SafetyReport } from '../../models';
import { ISafetyReport } from '../interfaces';

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

    async GET_ALL_BY_USER_ID(id: string) {
        try {
            const safetyReports: SafetyReport[] | null =
                await SafetyReport.findAll({
                    where: {
                        user_id: id,
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
