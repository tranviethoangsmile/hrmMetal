import { createNewUser } from '../useCases/user.useCase';
import { User } from '../models';

const createUser = async (user: User) => {
    return createNewUser(user);
}

export { createUser };
