import { Canteen } from '../models';

const create_canteen = async (data: any) => {
    try {
        const new_canteen: Canteen | null = await Canteen.create({
            ...data,
        });
        if (new_canteen != null) {
            return {
                success: true,
                data: new_canteen,
            };
        } else {
            return {
                success: false,
                message: 'create canteen failed',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_canteen_by_id = async (id: string) => {
    try {
        const canteen: Canteen | null = await Canteen.findOne({
            where: {
                id: id,
            },
            attributes: ['factory_name', 'description'],
        });
        if (canteen != null) {
            return {
                success: true,
                data: canteen,
            };
        } else {
            return {
                success: false,
                message: 'canteen not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const get_all_canteen = async () => {
    try {
        const canteens: Canteen[] | null = await Canteen.findAll();
        if (canteens != null) {
            return {
                success: true,
                data: canteens,
            };
        } else {
            return {
                success: false,
                message: 'canteen not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { create_canteen, find_canteen_by_id, get_all_canteen };
