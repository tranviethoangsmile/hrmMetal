import {
    create_event_check_repo,
    search_event_checked_repo,
} from '../../repositorys/eventCheck/evenCheck.repo';
import {
    validate_create_event_check,
    validate_search_event_checked,
} from '../../validates/eventCheck/eventCheck.validate';
import { search_event_by_id_use } from '../events/events.useCase';

const create_event_check_use = async (field: any) => {
    try {
        const isValid = validate_create_event_check(field);
        if (isValid?.error) {
            throw new Error(isValid?.error?.message);
        }
        const event = await search_event_by_id_use(field.event_id);
        if (!event?.success) {
            throw new Error(event?.message);
        }
        const event_check = await create_event_check_repo(field);
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

const search_event_checked_use = async (field: any) => {
    try {
        const isValid = validate_search_event_checked(field);
        if (isValid?.error) {
            throw new Error(isValid?.error?.message);
        }
        const event_check = await search_event_checked_repo(field);
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

export { create_event_check_use, search_event_checked_use };
