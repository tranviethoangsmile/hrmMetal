import { Food } from "../models";
import { createFoodInterface } from '../interfaces/food.interface'
const create_food = async (food: createFoodInterface) => {
    try {
        const new_food = await Food.create({
            ...food
        });
        console.log('ok',new_food);

        if(new_food != null) {
            return {
                success: true,
                data: new_food,
            }
        }else {
            return {
                success: false,
                message: 'create food failed',
            }
        }
    } catch (error) {
       return {
        error
       }
    }
}

const find_food_by_id = async (id: string) => {
    try {
        const food = await Food.findOne({
            where:{
                id: id
            }
        });

        if(food) {
            return {
                food,
            }
        }else {
            return {
                success: false,
                message:'food not found',
            }
        }
    } catch (error) {
        return {
            error: true,
            message: error,
        }
    }
}

export { create_food, find_food_by_id }