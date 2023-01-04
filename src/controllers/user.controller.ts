import { createNewUser, updateUser } from '../useCases/user.useCase';
import { User } from '../models';

const createUser = async (user: User) => {
    return createNewUser(user);
}

const userUpdate = async (user: User) => {
    return updateUser(user);
}

export { createUser, userUpdate };
