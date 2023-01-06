import { createFood, findFoodById } from '../useCases/food.useCase';

const create = async (food: any) => {
    return await createFood(food);
}

const find = async (id: any) => {
    return await findFoodById(id);
}

export { create, find }