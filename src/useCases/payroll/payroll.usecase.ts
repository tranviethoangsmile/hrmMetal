import {
    create_payroll_repo,
    delete_payroll_repo,
    update_payroll_repo,
    search_payroll_by_id_repo,
    search_payroll_of_user_in_month_repo,
} from '../../repositorys/payroll/payroll.repository';
import {
    validate_create_payroll,
    validate_update_payroll,
} from '../../validates/payroll/payroll.validate';
import { findUserById } from '../user/user.useCase';

const create_payroll_usecase = async (field: any) => {
    try {
        const isValid = validate_create_payroll(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error?.message}`);
        }
        const user = await findUserById(field?.user_id);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }
        const result = await create_payroll_repo({
            ...field,
        });
        if (!result?.success) {
            throw new Error(result?.message);
        }
        return {
            success: true,
            data: result?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use: ${error?.message}`,
        };
    }
};

const update_payroll_usecase = async (field: any) => {
    try {
        const isValid = validate_update_payroll(field);
        if (isValid?.error) {
            throw new Error(`${isValid?.error?.message}`);
        }
        const payroll = await search_payroll_by_id_repo(field?.id);
        if (!payroll?.success) {
            throw new Error(payroll?.message);
        }
        const result = await update_payroll_repo({
            ...field,
        });
        if (!result?.success) {
            throw new Error(result?.message);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use: ${error?.message}`,
        };
    }
};

export { create_payroll_usecase, update_payroll_usecase };
