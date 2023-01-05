import { createNewUser, updateUser, deleteUser, findUserById, findUserByName, findAllUser  } from '../useCases/user.useCase';
import { User } from '../models';

const create = async (user: User) => {
    return await createNewUser(user);
}

const update = async (user: User) => {
    return await updateUser(user);
}

const destroy = async (id: string) => { 
    return await deleteUser(id);
}

const findById = async (id: string) => {
    return await findUserById(id);
}

const findByName = async (name: string) => {
    return await findUserByName(name);
}

const findAll = async () => {
    return await findAllUser();
}

export { create, update, destroy, findById, findByName, findAll };
