import {
    create_safety_check_use,
    search_safety_checked_use,
} from '../../useCases/safetyCheck/safetyCheck.useCase';

const create_safety_check_controller = async (field: any) => {
    return await create_safety_check_use(field);
};

const search_safety_checked_controller = async (field: any) => {
    return await search_safety_checked_use(field);
};
export { create_safety_check_controller, search_safety_checked_controller };
