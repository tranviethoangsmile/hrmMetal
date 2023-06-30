import {
    create_paid_leave,
    find_paid_leave,
    update_paid_leave,
} from '../useCases/paidLeaveRequest.useCase';

const create = async (data: any) => {
    return await create_paid_leave(data);
};
const get_all = async () => {
    return await find_paid_leave();
};
const update_is_active = async (data: any) => {
    return await update_paid_leave(data);
};

export { create, get_all, update_is_active };
