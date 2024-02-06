import { Op } from 'sequelize';
import { Department, Trainning, User } from '../../models';

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

const find_all_trainning = async () => {
    try {
        const trainnings: Trainning[] | null = await Trainning.findAll({
            attributes: [
                'id',
                'trainning_name',
                'product_name',
                'description',
                'media_path',
                'user_id',
            ],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });
        if (trainnings != null) {
            return {
                success: true,
                data: trainnings,
            };
        } else {
            return {
                success: false,
                message: 'trainning not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const search_trainning = async (data: any) => {
    try {
        const trainnings: Trainning[] | null = await Trainning.findAll({
            where: {
                product_name: {
                    [Op.like]: `%${data.toUpperCase()}%`,
                },
            },
            attributes: [
                'id',
                'trainning_name',
                'product_name',
                'description',
                'media_path',
                'user_id',
            ],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });
        if (trainnings != null) {
            return {
                success: true,
                data: trainnings,
            };
        } else {
            return {
                success: false,
                message: 'trainning not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { Create_trainning, find_all_trainning, search_trainning };
