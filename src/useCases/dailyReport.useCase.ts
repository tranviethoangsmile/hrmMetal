import {
    daily_report_create,
    find_report_all,
    find_report,
    find_daily_report_by_id,
} from '../repositorys/dailyReport.repository';
import {
    create_daily_report,
    search_report,
} from '../interfaces/dailyReport.interface';
import { create_code_error } from '../interfaces/codeError.interface';
import {
    valid_create_daily_report,
    valid_search_daily_report,
} from '../validates/dailyReport.validate';
import { validation_id } from '../validates';
import { DailyReport } from '../models';
import { Products } from '../enum/Product.enum';
import { create_err_for_report } from './codeError.useCase';

const search_daily_report = async (data: search_report) => {
    try {
        const valid = await valid_search_daily_report(data);
        if (!valid?.error) {
            const reports = await find_report(data);
            if (reports?.success) {
                return {
                    success: true,
                    data: reports?.data,
                };
            } else {
                return {
                    success: false,
                    message: 'report not found',
                };
            }
        } else {
            return {
                success: false,
                message: valid?.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const create_daily_report = async (data: any) => {
    try {
        const rp_field_create: create_daily_report = data.rp;
        const valid = valid_create_daily_report(rp_field_create);
        const errors: create_code_error[] | null = data.err;
        if (!valid.error) {
            if (
                typeof rp_field_create.product === 'string' &&
                Object.values(Products).includes(rp_field_create.product)
            ) {
                const rep_rp = await daily_report_create(rp_field_create);
                if (rep_rp?.success) {
                    if (errors != null) {
                        const rp_id = rep_rp?.data?.id;
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
                        const created_err = await create_err_for_report(
                            err_data,
                        );
                        if (created_err) {
                            return {
                                success: true,
                                data: created_err,
                            };
                        } else {
                            return {
                                success: false,
                                message: 'created err of Report failed',
                            };
                        }
                    } else {
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
                    success: false,
                    message: 'data Product not valid',
                };
            }
        } else {
            return {
                success: false,
                message: valid.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_all_rp = async () => {
    try {
        const errs = await find_report_all();
        if (errs?.success) {
            return {
                success: true,
                data: errs?.data,
            };
        } else {
            return {
                success: false,
                message: errs?.message,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const find_rp_by_id = async (id: any) => {
    try {
        const valid = await validation_id(id);
        if (!valid?.error) {
            const report = await find_daily_report_by_id(id);
            console.log(report);
            if (report?.success) {
                return {
                    success: true,
                    data: report?.data,
                };
            } else {
                return {
                    success: false,
                    message: report?.message,
                };
            }
        } else {
            return {
                success: false,
                message: valid?.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { create_daily_report, find_all_rp, search_daily_report, find_rp_by_id };
