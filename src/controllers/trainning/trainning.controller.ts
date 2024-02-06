import {
    Create,
    Get_all_trainning,
    Search_all_trainning,
} from '../../useCases/trainning/trainning.useCase';

const create = async (data: any) => {
    return await Create(data);
};

const get_all_trainning = async () => {
    return await Get_all_trainning();
};

const search_all_trainning = async (data: any) => {
    return await Search_all_trainning(data);
};

export { create, get_all_trainning, search_all_trainning };
