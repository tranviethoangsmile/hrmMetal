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
    } catch (error) {
        return {
            success: false,
            message: error,
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
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

export { create_canteen, find_canteen_by_id };
