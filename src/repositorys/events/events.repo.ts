import { Events } from '../../models';
import { IEventRepository } from '../interfaces/events/IEventRepository';
import { Op } from 'sequelize';
class EventRepository implements IEventRepository {
    async create_events_repo(field: any) {
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
    }

    async delete_events_repo(id: string) {
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
    }

    async update_events_repo(field: any) {
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
    }

    async search_event_by_id_repo(id: string) {
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
    }

    async get_all_event_repo() {
        try {
            const events: Events[] = await Events.findAll({
                where: { is_active: true },
            });
            if (events.length < 1) {
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
    }

    async get_events_with_position_repo(position: string) {
        try {
            const events: Events[] = await Events.findAll({
                where: {
                    [Op.and]: [
                        {
                            is_active: true,
                            position: {
                                [Op.or]: [position, 'COMPORATION'],
                            },
                        },
                    ],
                },
            });
            if (events.length < 1) {
                throw new Error(`--event not exist--`);
            }
            return {
                success: true,
                data: events,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repo ${error.message}`,
            };
        }
    }
}

export default EventRepository;
