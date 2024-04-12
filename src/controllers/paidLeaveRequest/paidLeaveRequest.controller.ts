import {
    create_paid_leave,
    find_paid_leave,
    update_paid_leave,
    search_leave_request_with_field_use,
} from '../../useCases/paidLeaveRequest/paidLeaveRequest.useCase';

const create = async (data: any) => {
    return await create_paid_leave(data);
};
const get_all = async () => {
    return await find_paid_leave();
};
const update_is_active = async (data: any) => {
    return await update_paid_leave(data);
};

const search_leave_request_with_field_controller = async (field: any) => {
    return await search_leave_request_with_field_use(field);
};

export {
    create,
    get_all,
    update_is_active,
    search_leave_request_with_field_controller,
};
