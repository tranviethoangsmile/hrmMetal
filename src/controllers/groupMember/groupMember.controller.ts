import { get_group_member_of_user_use } from '../../useCases';

const find_group_member_of_user_controller = async (id: string) => {
    return get_group_member_of_user_use(id);
};

export { find_group_member_of_user_controller };
