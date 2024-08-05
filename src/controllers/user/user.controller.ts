import {
    createNewUser,
    updateUser,
    deleteUser,
    findUserById,
    findUserByName,
    findAllUser,
    userFindAllWithFieldUse,
    getUserForLeaveFeatureUse,
} from '../../useCases/user/user.useCase';
const getUserForLeaveFeatureControll = async (id: any) => {
    return await getUserForLeaveFeatureUse(id);
};
const findAllUserWithFieldControll = async (filed: any) => {
    return await userFindAllWithFieldUse(filed);
};
const create = async (user: any) => {
    return await createNewUser(user);
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
    create,
    update,
    destroy,
    findById,
    findByName,
    findAll,
    findAllUserWithFieldControll,
    getUserForLeaveFeatureControll,
};
