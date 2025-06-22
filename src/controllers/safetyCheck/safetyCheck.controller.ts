import {
    create_safety_check_use,
    search_safety_checked_use,
    getAllUserCheckedSafetyCheckEventUse,
} from '../../useCases';

const create_safety_check_controller = async (field: any) => {
    return await create_safety_check_use(field);
};

const search_safety_checked_controller = async (field: any) => {
    return await search_safety_checked_use(field);
};

const getAllUserCheckedSafetyCheckEventController = async (id: string) => {
    return await getAllUserCheckedSafetyCheckEventUse(id);
};

export {
    create_safety_check_controller,
    search_safety_checked_controller,
    getAllUserCheckedSafetyCheckEventController,
};
