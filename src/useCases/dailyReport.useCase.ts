import { create_code_err } from '../repositorys/codeError.repository';
import { daily_report_create } from '../repositorys/dailyReport.repository';
import { create_daily_report } from '../interfaces/dailyReport.interface';
import { valid_create_daily_report } from '../helper/dailyReport.validate.helper';
import { DailyReport } from '../models';
import db from '../db/db';
import { create_err_for_report } from './codeError.useCase';
const create_daily_report = async (data: any) => {
    try {
        const rp_field_create: DailyReport = data.rp;
        const valid = valid_create_daily_report(rp_field_create);
        const errors: [] = data.err;
        if (!valid.error) {
            const rep_rp = await daily_report_create(rp_field_create);
            if (rep_rp) {
                if (errors != null) {
                    const rp_id = rep_rp.id;
                    const err_data = errors.map(
                        ({
                            code,
                            description,
                            shutdown_time,
                            daily_report_id,
                        }) => ({
                            code,
                            description,
                            shutdown_time,
                            daily_report_id: rp_id,
                        }),
                    );
                    const created_err = await create_err_for_report(err_data);
                    if (created_err) {
                        return created_err;
                    } else {
                        return {
                            success: false,
                            message: 'created err of Report failed',
                        };
                    }
                }else {
                    return {
                        success: true,
                        message: 'created report',
                    };
                }
            } else {
                return {
                    success: false,
                    message: 'created report failed',
                };
            }
        } else {
            return {
                error: true,
                message: valid.error.message,
            };
        }
    } catch (error) {
        return error;
    }
};

export { create_daily_report };
