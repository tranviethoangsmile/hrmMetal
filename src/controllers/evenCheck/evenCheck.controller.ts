import { create_event_check_use } from '../../useCases/eventCheck/eventCheck.useCase';

const create_event_check_controller = async (field: any) => {
    return await create_event_check_use(field);
};

export { create_event_check_controller };
