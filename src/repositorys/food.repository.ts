import { Food } from '../models';
const create_food = async (food: any) => {
    try {
        const new_food: Food | null = await Food.create({
            ...food,
        });
        if (new_food != null) {
            return {
                success: true,
                data: new_food,
            };
        } else {
            return {
                success: false,
                message: 'create food failed',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const find_food_by_id = async (id: string) => {
    try {
        const food: Food | null = await Food.findOne({
            where: {
                id: id,
            },
        });
        if (food != null) {
            return {
                success: true,
                data: food,
            };
        } else {
            return {
                success: false,
                message: 'food not found',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const get_all_food = async () => {
    try {
        const foods: Food [] | null = await Food.findAll();
        if( foods != null) {
            return {
                success: true,
                data: foods
            }
        }else {
            return {
                success: false,
                message: 'food not found',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
}

export { create_food, find_food_by_id, get_all_food };
