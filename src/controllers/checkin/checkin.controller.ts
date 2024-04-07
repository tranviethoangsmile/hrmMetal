import {
    create_checkin_use,
    update_checkin_use,
    is_checked,
    search_checkin_of_user_in_month_useCase,
    get_checkin_of_position_in_date_use,
    get_checkin_detail_in_date_of_user_use,
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
const get_checkin_in_date_of_position_controller = async (field: any) => {
    return await get_checkin_of_position_in_date_use(field);
};
const get_checkin_detail_in_date_of_user_controller = async (field: any) => {
    return await get_checkin_detail_in_date_of_user_use(field);
};

export {
    create_checkin_controller,
    update_checkin_controller,
    is_checked_controller,
    search_checked_of_user_in_month_controller,
    get_checkin_in_date_of_position_controller,
    get_checkin_detail_in_date_of_user_controller,
};
