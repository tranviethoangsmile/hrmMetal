import {
    create_information_use,
    search_information_of_user_use,
    search_information_by_id_use,
    search_all_information_with_field_use,
} from '../../useCases/information/information.use';

const create_information_controller = async (value: any) => {
    return await create_information_use(value);
};
const search_information_user_controller = async (id: any) => {
    return await search_information_of_user_use(id);
};
const search_information_by_id_controller = async (id: any) => {
    return await search_information_by_id_use(id);
};
const search_all_information_with_field_controller = async (field: any) => {
    return await search_all_information_with_field_use(field);
};
export {
    create_information_controller,
    search_information_user_controller,
    search_information_by_id_controller,
    search_all_information_with_field_controller,
};
