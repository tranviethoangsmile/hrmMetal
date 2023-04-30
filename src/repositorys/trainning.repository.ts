import { Trainning, User } from '../models';

const Create_trainning = async (trainning: any) => {
    try {
        const new_trainning: Trainning | null = await Trainning.create({
            ...trainning,
        });
        if (new_trainning != null) {
            return {
                success: true,
                data: new_trainning,
            };
        } else {
            return {
                success: false,
                message: 'create user error',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

export { Create_trainning };
