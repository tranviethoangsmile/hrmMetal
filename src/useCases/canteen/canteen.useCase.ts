import {
    createCanteen,
    updateCanteen,
} from '../../interfaces/canteen/canteen.interface';
import {
    create_canteen,
    find_canteen_by_id,
    get_all_canteen,
} from '../../repositorys/canteen/canteen.repository';
import {
    validate_create_canteen,
    validate_update_canteen,
} from '../../validates/canteen/canteen.validate';
import { validation_id } from '../../validates';

const create = async (data: any) => {
    try {
        const valid = validate_create_canteen(data);
        if (!valid.error) {
            const new_canteen = await create_canteen({
                ...data,
            });
            if (new_canteen?.success) {
                return {
                    success: true,
                    data: new_canteen?.data,
                };
            } else {
                return {
                    success: false,
                    message: new_canteen?.message,
                };
            }
        } else {
            return {
                success: false,
                message: valid.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_canteen = async (id: string) => {
    try {
        const valid = await validation_id(id);
        if (!valid.error) {
            const canteen = await find_canteen_by_id(id);
            if (canteen?.success) {
                return {
                    success: true,
                    data: canteen?.data,
                };
            } else {
                return {
                    success: false,
                    message: canteen?.message,
                };
            }
        } else {
            return {
                success: false,
                message: 'id not valid',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_all_canteen = async () => {
    try {
        const canteens = await get_all_canteen();

        if (canteens?.success) {
            return {
                success: true,
                data: canteens?.data,
            };
        } else {
            return {
                success: false,
                message: canteens?.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.massage,
        };
    }
};

export { create, find_canteen, find_all_canteen };
