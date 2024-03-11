import { create_information_use } from '../../useCases/information/information.use';

const create_information_controller = async (value: any) => {
    return await create_information_use(value);
};
export { create_information_controller };
