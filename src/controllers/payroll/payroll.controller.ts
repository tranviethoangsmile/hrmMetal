import {
    create_payroll_usecase,
    update_payroll_usecase,
    search_payroll_of_user_in_month_use,
    search_payroll_by_id_usecase,
    destroy_payroll_usecase,
} from '../../useCases/payroll/payroll.usecase';

const create_payroll_controller = async (field: any) => {
    return await create_payroll_usecase(field);
};

const update_payroll_controller = async (field: any) => {
    return await update_payroll_usecase(field);
};

const search_payroll_of_user_in_month_controller = async (field: any) => {
    return await search_payroll_of_user_in_month_use(field);
};

const search_payroll_by_id_controller = async (id: string) => {
    return await search_payroll_by_id_usecase(id);
};

const destroy_payroll_controller = async (id: string) => {
    return await destroy_payroll_usecase(id);
};

export {
    create_payroll_controller,
    update_payroll_controller,
    search_payroll_of_user_in_month_controller,
    search_payroll_by_id_controller,
    destroy_payroll_controller,
};
