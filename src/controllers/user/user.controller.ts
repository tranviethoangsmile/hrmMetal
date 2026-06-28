import {
    createNewUser,
    updateUser,
    deleteUser,
    findUserById,
    findUserByName,
    findAllUser,
    userFindAllWithFieldUse,
    getUserForLeaveFeatureUse,
    getAllUserForOtRequestFeatureUse,
    get_all_users_of_position_for_admin_use,
} from '../../useCases';
const getAllUserForOtRequestFeatureControll = async (id: string) => {
    return await getAllUserForOtRequestFeatureUse(id);
};

const getUserForLeaveFeatureControll = async (id: any) => {
    return await getUserForLeaveFeatureUse(id);
};
const get_all_users_of_position_for_admin_controller = async (
    position: string,
) => {
    return await get_all_users_of_position_for_admin_use(position);
};
const findAllUserWithFieldControll = async (filed: any) => {
    return await userFindAllWithFieldUse(filed);
};
const update = async (user: any) => {
    return await updateUser(user);
};

const destroy = async (id: string) => {
    return await deleteUser(id);
};

const findById = async (id: string) => {
    return await findUserById(id);
};

const findByName = async (name: any) => {
    return await findUserByName(name);
};

const findAll = async () => {
    return await findAllUser();
};

export {
    update,
    destroy,
    findById,
    findByName,
    findAll,
    findAllUserWithFieldControll,
    getUserForLeaveFeatureControll,
    getAllUserForOtRequestFeatureControll,
    get_all_users_of_position_for_admin_controller,
};
