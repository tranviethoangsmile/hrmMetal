import { DayOffsRepository } from '../../repositorys';
import { validate_create_day_off } from '../../validates';
import { findUserById } from '../user/user.useCase';
const dayOffsRepository = new DayOffsRepository();

const create_day_off_use = async (field: any) => {
    try {
        const isValid = validate_create_day_off(field);
        if (isValid.error) {
            throw new Error(isValid.error?.message);
        }
        const dayOff = await dayOffsRepository.CREATE(field);
        if (!dayOff?.success) {
            throw new Error(
                dayOff?.message || 'Unknown error occurred in repository',
            );
        }
        return dayOff;
    } catch (error: any) {
        return {
            success: false,
            message: `usecase :: ${error.message}`,
        };
    }
};

const get_all_day_off_use = async () => {
    try {
        const dayOffs = await dayOffsRepository.GET_ALL();
        if (!dayOffs?.success) {
            throw new Error(dayOffs.message);
        }
        return dayOffs;
    } catch (error: any) {
        return {
            success: false,
            message: `usecase :: ${error.message}`,
        };
    }
};

export { create_day_off_use, get_all_day_off_use };
