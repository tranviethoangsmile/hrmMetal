import { create_overtime_request_usecase } from '../../useCases';

const create_overtime_request_controller = async (data: any) => {
    return await create_overtime_request_usecase(data);
};

export { create_overtime_request_controller };
