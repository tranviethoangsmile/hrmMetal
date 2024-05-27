import { create_safety_check_use } from '../../useCases/safetyCheck/safetyCheck.useCase';

const create_safety_check_controller = async (field: any) => {
    return await create_safety_check_use(field);
};

export { create_safety_check_controller };
