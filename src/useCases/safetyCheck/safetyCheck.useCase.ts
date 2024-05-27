import { create_safety_check_repo } from '../../repositorys/safetyCheck/safetyCheck.repo';
import { validate_create_safety_check } from '../../validates/safetyCheck/safetyCheck.validate';
import { search_event_by_id_use } from '../events/events.useCase';
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
        const safety_check = await create_safety_check_repo(field);
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
export { create_safety_check_use };
