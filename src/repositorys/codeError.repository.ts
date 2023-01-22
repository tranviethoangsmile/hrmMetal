import { CodeError, DailyReport } from '../models/index';
import { create_code_error } from '../interfaces/codeError.interface';
import { find_daily_report_by_id } from './dailyReport.repository';
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
    } catch (error) {
        return error;
    }
};

export { create_code_err };
