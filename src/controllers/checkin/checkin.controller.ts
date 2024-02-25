import {
    create_checkin_use,
    update_checkin_use,
    is_checked,
} from '../../useCases/checkin/checkin.useCase';

const create_checkin_controller = async (data: any) => {
    return await create_checkin_use(data);
};

const update_checkin_controller = async (field: any) => {
    return await update_checkin_use(field);
};

const is_checked_controller = async (field: any) => {
    return await is_checked(field);
};

export {
    create_checkin_controller,
    update_checkin_controller,
    is_checked_controller,
};
