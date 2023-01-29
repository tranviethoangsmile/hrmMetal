import { daily_report_create, find_report_all, find_report } from '../repositorys/dailyReport.repository';
import { create_daily_report, search_report } from '../interfaces/dailyReport.interface';
import { valid_create_daily_report, valid_search_daily_report } from '../helper/dailyReport.validate.helper';
import { DailyReport } from '../models';
import { Products } from '../enum/product.enum';
import { create_err_for_report } from './codeError.useCase';

const search_daily_report = async (data:search_report) => {
    try {
        const valid = await valid_search_daily_report (data);
        if(!valid?.error) {
            const reports = await find_report(data);
            if(reports?.success) {
                return {
                    success: true,
                    data: reports?.data
                }
            }else {
                return {
                    success: false,
                    message: 'report not found'
                }
            }
        }else {
            return {
                Error: true,
                message: 'data not valid',
            }
        }
    } catch (error) {
        return {
            error
        }
    }
}

const create_daily_report = async (data: any) => {
    try {
        const rp_field_create: DailyReport = data.rp;
        const valid = valid_create_daily_report(rp_field_create);
        const errors: [] = data.err;
        if (!valid.error) {
            if(typeof rp_field_create.product === 'string' && Object.values(Products).includes(rp_field_create.product)){
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
            }else {
                return ({
                    Error: true,
                    message: 'data Product not valid'
                })
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

const find_all_rp = async () => {
    try {
        const errs = await find_report_all();
        if(errs?.success) {
            return {
               success: true,
               data: errs
            }
        }else {
            return {
                success: false,
                message: 'not found Reports',
             }
        }
    } catch (error) {
        return{ 
            error,
        }
    }
}

export { create_daily_report, find_all_rp, search_daily_report };
