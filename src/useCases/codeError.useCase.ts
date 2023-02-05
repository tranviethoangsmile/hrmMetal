import { create_code_err } from '../repositorys/codeError.repository';
import { create_code_error } from '../interfaces/codeError.interface';
import { CodeError } from '../enum/codeError.enum';
import { find_rp_by_id } from '../useCases/dailyReport.useCase';
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
            if (resp_errs) {
                return {
                    success: true,
                    message: 'created code error and report',
                };
            } else {
                return {
                    success: false,
                    message: 'create code error failed',
                };
            }
        } else {
            return {
                Error: true,
                message: 'Code error not valid',
            };
        }
    } catch (error) {
        return error;
    }
};

export { create_err_for_report };
