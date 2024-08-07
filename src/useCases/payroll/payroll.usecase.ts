import {
    validate_create_payroll,
    validate_update_payroll,
    validate_search_payroll,
} from '../../validates/payroll/payroll.validate';
import { validation_id } from '../../validates';
import { findUserById } from '../user/user.useCase';
import { PayrollRepository } from '../../repositorys';

const payrollRepository = new PayrollRepository();
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
        const result = await payrollRepository.create_payroll_repo({
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
        const payroll = await payrollRepository.search_payroll_by_id_repo(
            field?.id,
        );
        if (!payroll?.success) {
            throw new Error(payroll?.message);
        }
        const result = await payrollRepository.update_payroll_repo({
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

const search_payroll_of_user_in_month_use = async (field: any) => {
    try {
        const isValid = validate_search_payroll(field);
        if (isValid?.error) {
            throw new Error(isValid?.error.message);
        }
        const payroll =
            await payrollRepository.search_payroll_of_user_in_month_repo(field);
        if (!payroll?.success) {
            throw new Error(payroll?.message);
        }
        return {
            success: true,
            data: payroll?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use: ${error?.message}`,
        };
    }
};

const search_payroll_by_id_usecase = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(isValid?.error.message);
        }
        const payroll = await payrollRepository.search_payroll_by_id_repo(id);
        if (!payroll?.success) {
            throw new Error(payroll?.message);
        }
        return {
            success: true,
            data: payroll?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use: ${error?.message}`,
        };
    }
};

const destroy_payroll_usecase = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(isValid?.error.message);
        }
        const payroll = await payrollRepository.search_payroll_by_id_repo(id);
        if (!payroll?.success) {
            throw new Error(payroll?.message);
        }
        const payroll_destroy = await payrollRepository.destroy_payroll_repo(
            id,
        );
        if (!payroll_destroy?.success) {
            throw new Error(payroll_destroy?.message);
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

export {
    create_payroll_usecase,
    update_payroll_usecase,
    search_payroll_of_user_in_month_use,
    search_payroll_by_id_usecase,
    destroy_payroll_usecase,
};
