import {
    create_code_err,
    find_err_of_report,
} from '../../repositorys/codeError/codeError.repository';
import {
    create_code_error,
    search_code_error,
} from '../../interfaces/codeError/codeError.interface';
import { CodeError } from '../../enum/codeError.enum';
import { valid_search_err } from '../../validates/codeError/codeError.validate';
import { find_rp_by_id } from '../dailyReport/dailyReport.useCase';
const create_err_for_report = async (data: any) => {
    try {
        const errs: create_code_error[] = data;
        var check: boolean = false;
        var rp_id: string;
        for (let i = 0; i < errs.length; i++) {
            if (
                typeof errs[i].code === 'string' &&
                Object.values(CodeError).includes(errs[i].code)
            ) {
                rp_id = errs[i].daily_report_id;
                const report = await find_rp_by_id(rp_id);
                if (report?.success) {
                    check = true;
                } else {
                    check = false;
                }
            } else {
                check = false;
            }
        }
        if (check) {
            const resp_errs = await create_code_err(errs);
            if (resp_errs?.success) {
                return {
                    success: true,
                    data: resp_errs?.data,
                };
            } else {
                return {
                    success: false,
                    message: resp_errs?.message,
                };
            }
        } else {
            return {
                success: false,
                message: 'Code error not valid',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_error_of_report = async (data: search_code_error) => {
    try {
        const valid = await valid_search_err(data);
        if (!valid?.error) {
            const errs = await find_err_of_report(data);
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

export { create_err_for_report, find_error_of_report };
