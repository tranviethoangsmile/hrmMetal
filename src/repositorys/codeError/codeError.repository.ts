import { when } from '@hapi/joi';
import { CodeError, DailyReport } from '../../models/index';
const create_code_err = async (data: any) => {
    try {
        const errs = await CodeError.bulkCreate(data);
        if (errs) {
            return {
                success: true,
                data: errs,
            };
        } else {
            return {
                success: false,
                message: 'create failed',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_err_of_report = async (field: any) => {
    try {
        const errs: CodeError[] | null = await CodeError.findAll({
            where: {
                ...field,
            },
            attributes: ['code', 'description', 'shutdown_time'],
        });
        if (errs != null) {
            return {
                success: true,
                data: errs,
            };
        } else {
            return {
                success: false,
                message: 'error of report not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { create_code_err, find_err_of_report };
