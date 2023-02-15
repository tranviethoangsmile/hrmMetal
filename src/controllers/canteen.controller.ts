import { create, find_canteen, find_all_canteen } from '../useCases/canteen.useCase';
import { createCanteen, updateCanteen } from '../interfaces/canteen.interface'

const create_canteen = async (data: createCanteen ) => {
    return await create(data);
}

const find_canteen_by_id = async (id: string ) => {
    return await find_canteen(id);
}

const get_all_canteen = async () => {
    return await find_all_canteen();
}

export { create_canteen, find_canteen_by_id, get_all_canteen };