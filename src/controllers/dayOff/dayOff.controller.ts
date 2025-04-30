import {
    create_day_off_use,
    get_all_day_off_use,
    get_day_off_by_id_use,
    delete_day_off_by_id_use,
    update_day_off_by_id_use,
} from '../../useCases';

const create_day_off_controller = async (field: any) => {
    return await create_day_off_use(field);
};

const get_all_day_off_controller = async () => {
    return await get_all_day_off_use();
};

const get_day_off_by_id_controller = async (id: string) => {
    return await get_day_off_by_id_use(id);
};

const delete_day_off_by_id_controller = async (id: string) => {
    return await delete_day_off_by_id_use(id);
};

const update_day_off_by_id_controller = async (field: any) => {
    return await update_day_off_by_id_use(field);
};
export {
    create_day_off_controller,
    get_all_day_off_controller,
    get_day_off_by_id_controller,
    delete_day_off_by_id_controller,
    update_day_off_by_id_controller,
};
