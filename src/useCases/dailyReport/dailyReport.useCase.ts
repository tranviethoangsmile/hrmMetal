import {
    daily_report_create,
    find_report_all,
    find_report,
    find_daily_report_by_id,
} from '../../repositorys/dailyReport/dailyReport.repository';
import {
    create_daily_report,
    search_report,
} from '../../interfaces/dailyReport/dailyReport.interface';
import {
    valid_create_daily_report,
    valid_search_daily_report,
} from '../../validates/dailyReport/dailyReport.validate';
import { validation_id } from '../../validates';
import { Products } from '../../enum/product.enum';
import { findUserById } from '../user/user.useCase';
import { shift } from '../../enum/shift.enum';
import { update_inventory_controller } from '../../controllers/inventory/inventory.controller';
// import { create_code_error } from '../../interfaces/codeError/codeError.interface';
// import { create_err_for_report } from '../codeError/codeError.useCase';
const create_daily_report_use = async (field: create_daily_report) => {
    try {
        const isValid = valid_create_daily_report(field);
        if (!isValid?.error) {
            const user = await findUserById(field?.user_id);
            if (user?.success) {
                if (
                    typeof field?.product === 'string' &&
                    Object.values(Products).includes(field?.product)
                ) {
                    if (
                        typeof field?.shift === 'string' &&
                        Object.values(shift).includes(field?.shift)
                    ) {
                        const report = await daily_report_create(field);
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
                            message: `shift name not valid use`,
                        };
                    }
                } else {
                    return {
                        success: false,
                        message: `product name not valid use`,
                    };
                }
            } else {
                return {
                    success: false,
                    message: `${user?.message} use`,
                };
            }
        } else {
            return {
                success: false,
                message: isValid?.error,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: `${error?.message} use`,
        };
    }
};

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

export {
    create_daily_report_use,
    find_all_rp,
    search_daily_report,
    find_rp_by_id,
};
