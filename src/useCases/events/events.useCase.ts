import { EventRepository } from '../../repositorys';
import {
    validation_id,
    validate_create_events,
    validate_update_events,
} from '../../validates';
import { Position } from '../../enum';
import { PushNotificationService } from '../../services';
const eventRepository = new EventRepository();
const pushNotiService = new PushNotificationService();
const create_events_use = async (field: any) => {
    try {
        const isValid = validate_create_events(field);
        if (isValid?.error) {
            throw new Error(isValid?.error?.message);
        }
        if (
            typeof field.position === 'string' &&
            !Object.values(Position).includes(field.position)
        ) {
            throw new Error('position is not valid');
        }
        const event = await eventRepository.create_events_repo(field);

        if (!event?.success) {
            throw new Error(event?.message);
        }
        if (event?.data?.is_safety) {
            await pushNotiService.handlePushNotiForEvent(event?.data?.position);
        }
        return {
            success: true,
            data: event?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `usecase: ${error?.message}`,
        };
    }
};
const delete_events_use = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(isValid?.error?.message);
        }
        const result = await eventRepository.delete_events_repo(id);
        if (!result?.success) {
            throw new Error(result?.message);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `usecase: ${error?.message}`,
        };
    }
};

const update_events_use = async (field: any) => {
    try {
        const isValid = validate_update_events(field);
        if (isValid?.error) {
            throw new Error(isValid?.error?.message);
        }
        const event = await eventRepository.search_event_by_id_repo(field.id);
        if (!event?.success) {
            throw new Error(event?.message);
        }
        const result = await eventRepository.update_events_repo({
            ...field,
        });
        if (!result?.success) {
            throw new Error(result?.message);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `usecase: ${error?.message}`,
        };
    }
};

const search_event_by_id_use = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(isValid?.error?.message);
        }
        const event = await eventRepository.search_event_by_id_repo(id);
        if (!event?.success) {
            throw new Error(event?.message);
        }
        return {
            success: true,
            data: event?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `usecase: ${error?.message}`,
        };
    }
};

const get_all_events_use = async () => {
    try {
        const events = await eventRepository.get_all_event_repo();
        if (!events?.success) {
            throw new Error(events?.message);
        }
        return {
            success: true,
            data: events?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `usecase: ${error?.message}`,
        };
    }
};

export {
    create_events_use,
    delete_events_use,
    update_events_use,
    search_event_by_id_use,
    get_all_events_use,
};
