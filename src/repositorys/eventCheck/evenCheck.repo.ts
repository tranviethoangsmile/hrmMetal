import { EventChecks } from '../../models';

const create_event_check_repo = async (field: any) => {
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
};
export { create_event_check_repo };
