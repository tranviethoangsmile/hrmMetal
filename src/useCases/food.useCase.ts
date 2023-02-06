import { createFoodInterface } from '../interfaces/food.interface';
import { create_food, find_food_by_id } from '../repositorys/food.repository';
import { validate_food_create } from '../validates/food.validate';
import { validation_id } from '../validates';
const createFood = async (food: createFoodInterface) => {
    try {
        const foodCreateField = await validate_food_create(food);
        if (!foodCreateField.error) {
            const new_food = await create_food({
                ...food,
            });
            if (new_food?.success) {
                return {
                   success: true,
                   data: new_food?.data
                };
            } else {
                return {
                    success: false,
                    message: new_food?.message,
                };
            }
        } else {
            return {
                success: false,
                message: 'data not valid',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const findFoodById = async (id: string) => {
    try {
        const valid = await validation_id(id);
        if (!valid.error) {
            const food = await find_food_by_id(id);
            if (food?.success) {
                return {
                    success: true,
                    data: food?.data,
                };
            } else {
                return {
                    success: false,
                    message: food?.message,
                };
            }
        } else {
            return {
                success: false,
                message: 'id not valid',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

export { createFood, findFoodById };
