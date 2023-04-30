import { Create } from '../useCases/trainning.useCase';

const create = async (data: any) => {
    return await Create(data);
};

export { create };
