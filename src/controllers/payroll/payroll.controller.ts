import {
    create_payroll_usecase,
    update_payroll_usecase,
} from '../../useCases/payroll/payroll.usecase';

const create_payroll_controller = async (field: any) => {
    return await create_payroll_usecase(field);
};

const update_payroll_controller = async (field: any) => {
    return await update_payroll_usecase(field);
};

export { create_payroll_controller, update_payroll_controller };
