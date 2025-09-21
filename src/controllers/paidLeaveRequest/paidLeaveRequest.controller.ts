import {
    create_paid_leave,
    find_paid_leave,
    update_paid_leave,
    search_leave_request_with_field_use,
    update_un_approve_leave_request_use,
    update_confirm_from_admin_paid_leave_request_use,
    delete_paid_leave_request_with_by_id_use,
} from '../../useCases';

const create_paid_leave_controller = async (data: any) => {
    return await create_paid_leave(data);
};
const get_all_paid_leave_controller = async () => {
    return await find_paid_leave();
};
const update_is_active_paid_leave_controller = async (data: any) => {
    return await update_paid_leave(data);
};

const search_leave_request_with_field_controller = async (field: any) => {
    return await search_leave_request_with_field_use(field);
};
const update_un_approve_leave_request_controller = async (field: any) => {
    return await update_un_approve_leave_request_use(field);
};
const update_confirm_from_admin_paid_leave_request_controller = async (
    field: any,
) => {
    return await update_confirm_from_admin_paid_leave_request_use(field);
};

const delete_paid_leave_request_by_id_controller = async (
    delete_value: any,
) => {
    return await delete_paid_leave_request_with_by_id_use(delete_value);
};

export {
    create_paid_leave_controller,
    get_all_paid_leave_controller,
    update_is_active_paid_leave_controller,
    search_leave_request_with_field_controller,
    update_un_approve_leave_request_controller,
    update_confirm_from_admin_paid_leave_request_controller,
    delete_paid_leave_request_by_id_controller,
};
