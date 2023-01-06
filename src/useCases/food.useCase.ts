import { createFoodInterface } from '../interfaces/food.interface';
import { create_food, find_food_by_id } from '../repositorys/food.repository';
import { validate_food_create } from '../helper/food.validate.hepler';
import { validation_id } from '../helper/';
const createFood = async (food: createFoodInterface) => {
    try {
        const foodCreateField = await validate_food_create(food);
        if (!foodCreateField.error) {
            const new_food = await create_food({
                ...food,
            });
            if (new_food?.success) {
                return {
                    new_food,
                };
            } else {
                return {
                    success: false,
                    message: 'Something went wrong',
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
            message: 'create Food failed useCase',
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
                    food,
                };
            } else {
                return {
                    success: false,
                    message: 'food not found',
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
            message: 'find Food error',
        };
    }
};

export { createFood, findFoodById };
