import { createCanteen, updateCanteen } from '../interfaces/canteen.interface'
import { create_canteen, find_canteen_by_id } from '../repositorys/canteen.repository';
import { validate_create_canteen, validate_update_canteen } from '../helper/canteen.validate.helper'
import { validation_id } from '../helper/'

const create = async (data: createCanteen) => {
    const valid = validate_create_canteen(data);
    console.log(valid);
    if (!valid.error) {
        const new_canteen = await create_canteen({
            ...data,
        });
        if (new_canteen) {
            return {
                success: true,
                new_canteen,
            }
        }else {
            return {
                success: false,
                message: 'canteen create failed',
            }
        }
    } else {
        return {
            error: true,
            message: valid.error.message
        }
    }
}

const find_canteen = async (id: string) => {
    try {
        const valid = await validation_id(id);
        if (!valid.error) {
            const canteen = await find_canteen_by_id(id);
            if (canteen) {
                return {
                    success: true,
                    canteen
                }
            }else {
                return {
                    success: false,
                    message: 'canteen not found',
                }
            }
        }else {
            return {
                error: true,
                message: 'id not valid'
            }
        }
    } catch (error) {
        return {
            error: true,
            message: 'error trying to find canteen',
        }
    }
}

export { create, find_canteen };