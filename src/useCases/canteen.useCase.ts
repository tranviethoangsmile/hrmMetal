import { createCanteen, updateCanteen } from '../interfaces/canteen.interface'
import { create_canteen, find_canteen_by_id } from '../repositorys/canteen.repository';
import { validate_create_canteen, validate_update_canteen } from '../validates/canteen.validate'
import { validation_id } from '../validates'

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
                }
            }else {
                return {
                    success: false,
                    message: new_canteen?.message,
                }
            }
        } else {
            return {
                success: false,
                message: valid.error.message
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}

const find_canteen = async (id: string) => {
    try {
        const valid = await validation_id(id);
        if (!valid.error) {
            const canteen = await find_canteen_by_id(id);
            if (canteen?.success) {
                return {
                    success: true,
                    data: canteen?.data
                }
            }else {
                return {
                    success: false,
                    message: canteen?.message,
                }
            }
        }else {
            return {
                success: false,
                message: 'id not valid'
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}

export { create, find_canteen };