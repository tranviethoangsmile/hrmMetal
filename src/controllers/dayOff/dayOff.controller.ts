import { create_day_off_use, get_all_day_off_use } from '../../useCases';

const create_day_off_controller = async (field: any) => {
    return await create_day_off_use(field);
};

const get_all_day_off_controller = async () => {
    return await get_all_day_off_use();
};

export { create_day_off_controller, get_all_day_off_controller };
