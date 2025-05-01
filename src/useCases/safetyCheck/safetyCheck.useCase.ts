import { SafetyCheckRepository } from '../../repositorys';
import {
    validate_create_safety_check,
    validate_search_safety_checked,
} from '../../validates';
import { search_event_by_id_use } from '../index';

const safetyCheckRepository = new SafetyCheckRepository();
const create_safety_check_use = async (field: any) => {
    try {
        const isValid = validate_create_safety_check(field);
        if (isValid?.error) {
            throw new Error(isValid?.error?.message);
        }
        const event = await search_event_by_id_use(field.event_id);
        if (!event?.success) {
            throw new Error(event?.message);
        }
        const safety_check =
            await safetyCheckRepository.create_safety_check_repo(field);
        if (!safety_check?.success) {
            throw new Error(safety_check?.message);
        }
        return {
            success: true,
            data: safety_check?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use: ${error?.message}`,
        };
    }
};

const search_safety_checked_use = async (field: any) => {
    try {
        const isValid = validate_search_safety_checked(field);
        if (isValid?.error) {
            throw new Error(isValid?.error?.message);
        }
        const event_check =
            await safetyCheckRepository.search_safety_checked_repo(field);
        if (!event_check?.success) {
            throw new Error(event_check?.message);
        }
        return {
            success: true,
            data: event_check?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `use: ${error?.message}`,
        };
    }
};
export { create_safety_check_use, search_safety_checked_use };
