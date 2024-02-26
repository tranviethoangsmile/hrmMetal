import {
    create_checkin_use,
    update_checkin_use,
    is_checked,
    search_checkin_of_user_in_month_useCase,
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
const search_checked_of_user_in_month_controller = async (field: any) => {
    return await search_checkin_of_user_in_month_useCase(field);
};

export {
    create_checkin_controller,
    update_checkin_controller,
    is_checked_controller,
    search_checked_of_user_in_month_controller,
};
