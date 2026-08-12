import { EventChecks } from '../../models';
import { IEvencheckRepository } from '../interfaces';
class EventCheckRepository implements IEvencheckRepository {
    async create_event_check_repo(field: any) {
        try {
            const evenCheck: EventChecks | null = await EventChecks.create({
                ...field,
            });
            if (evenCheck == null) {
                throw new Error('create event check error');
            }
            return {
                success: true,
                data: evenCheck,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repo: ${error?.message}`,
            };
        }
    }

    async search_event_checked_repo(field: any) {
        try {
            const eventCheck: EventChecks | null = await EventChecks.findOne({
                where: {
                    ...field,
                },
            });
            if (eventCheck == null) {
                throw new Error('not exist !!');
            }
            return {
                success: true,
                data: eventCheck,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repo: ${error?.message}`,
            };
        }
    }
}
export default EventCheckRepository;
