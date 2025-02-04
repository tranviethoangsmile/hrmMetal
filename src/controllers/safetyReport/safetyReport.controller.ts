import {
    create_safety_report_usecase,
    update_safety_report_usecase,
    confirm_safety_report_usecase,
    delete_safety_report_usecase,
    get_all_safety_report_by_user_id_usecase,
    get_all_safety_report_by_department_id_usecase,
} from '../../useCases';

const create_safety_report_controller = async (data: any) => {
    return await create_safety_report_usecase(data);
};

const update_safety_report_controller = async (field: any) => {
    return await update_safety_report_usecase(field);
};

const confirm_safety_report_controller = async (field: any) => {
    return await confirm_safety_report_usecase(field);
};

const delete_safety_report_controller = async (field: any) => {
    return await delete_safety_report_usecase(field);
};

const get_all_safety_report_by_user_id_controller = async (id: string) => {
    return await get_all_safety_report_by_user_id_usecase(id);
};

const get_all_safety_report_by_department_id_controller = async (
    id: string,
) => {
    return await get_all_safety_report_by_department_id_usecase(id);
};

export {
    create_safety_report_controller,
    update_safety_report_controller,
    confirm_safety_report_controller,
    delete_safety_report_controller,
    get_all_safety_report_by_user_id_controller,
    get_all_safety_report_by_department_id_controller,
};
