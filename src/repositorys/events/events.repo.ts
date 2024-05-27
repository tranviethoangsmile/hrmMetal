import { where } from 'sequelize';
import { Events } from '../../models';
import { idText } from 'typescript';

const create_events_repo = async (field: any) => {
    try {
        const event: Events | null = await Events.create({
            ...field,
        });
        if (event == null) {
            throw new Error('Error creating event');
        }
        return {
            success: true,
            data: event,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo: ${error.message}`,
        };
    }
};

const delete_events_repo = async (id: string) => {
    try {
        const result = await Events.destroy({
            where: {
                id: id,
            },
        });
        if (result !== 1) {
            throw new Error('Error deleting event');
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo: ${error.message}`,
        };
    }
};

const update_events_repo = async (field: any) => {
    try {
        console.log(field);
        const event = await Events.update(
            { ...field },
            {
                where: {
                    id: field.id,
                },
            },
        );
        if (event[0] !== 1) {
            throw new Error('Error updating event');
        }

        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo: ${error.message}`,
        };
    }
};

const search_event_by_id_repo = async (id: string) => {
    try {
        const event: Events | null = await Events.findOne({
            where: {
                id: id,
                is_active: true,
            },
        });
        if (event == null) {
            throw new Error('Event not found or not avaliable');
        }
        return {
            success: true,
            data: event,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo: ${error.message}`,
        };
    }
};

const get_all_event_repo = async () => {
    try {
        const events: Events[] | null = await Events.findAll({
            where: { is_active: true },
        });
        if (events == null) {
            throw new Error('Event not exist!!!');
        }
        return {
            success: true,
            data: events,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `repo: ${error.message}`,
        };
    }
};

export {
    create_events_repo,
    delete_events_repo,
    update_events_repo,
    search_event_by_id_repo,
    get_all_event_repo,
};
