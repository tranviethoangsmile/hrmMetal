import {
    createFood,
    findFoodById,
    find_all_food,
} from '../../useCases/food/food.useCase';

const create = async (food: any) => {
    return await createFood(food);
};

const find = async (id: any) => {
    return await findFoodById(id);
};

const find_all = async () => {
    return await find_all_food();
};

export { create, find, find_all };
