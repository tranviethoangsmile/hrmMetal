import {
    create_overtime_request_usecase,
    get_all_overtime_request_usecase,
    update_isConfirm_ovetime_request_usecase,
    get_ovetime_request_by_id_usecase,
    delete_overtime_request_by_id_usecase,
} from '../../useCases';

const create_overtime_request_controller = async (data: any) => {
    return await create_overtime_request_usecase(data);
};

const get_all_overtime_request_controller = async () => {
    return await get_all_overtime_request_usecase();
};
const get_overtime_request_by_id_controller = async (id: string) => {
    return await get_ovetime_request_by_id_usecase(id);
};
const update_isConfirm_ovetime_request_controller = async (data: any) => {
    return await update_isConfirm_ovetime_request_usecase(data);
};
const delete_overtime_request_by_id_controller = async (data: any) => {
    return await delete_overtime_request_by_id_usecase(data);
};

export {
    create_overtime_request_controller,
    get_all_overtime_request_controller,
    get_overtime_request_by_id_controller,
    update_isConfirm_ovetime_request_controller,
    delete_overtime_request_by_id_controller,
};
