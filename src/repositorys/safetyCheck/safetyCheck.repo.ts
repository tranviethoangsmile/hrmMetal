import { SafetyChecks, User } from '../../models';
import { ISafetyCheckRepository } from '../interfaces';

class SafetyCheckRepository implements ISafetyCheckRepository {
    async create_safety_check_repo(field: any) {
        try {
            const safety_check: SafetyChecks | null = await SafetyChecks.create(
                {
                    ...field,
                },
            );
            if (safety_check == null) {
                throw new Error('Error creating safety check');
            }
            return {
                success: true,
                data: safety_check,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repo: ${error.message}`,
            };
        }
    }

    async search_safety_checked_repo(field: any) {
        try {
            const eventCheck: SafetyChecks | null = await SafetyChecks.findOne({
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
    async GET_ALL_USER_CHECKED_SAFETY_CHECK_EVENT(id: string) {
        try {
            const safetyChecks: SafetyChecks[] | null =
                await SafetyChecks.findAll({
                    where: {
                        event_id: id,
                    },
                    attributes: ['user_id', 'created_at'],
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name'],
                        },
                    ],
                });
            if (safetyChecks === null || safetyChecks.length < 1) {
                throw new Error('not exist !!');
            }
            return {
                success: true,
                data: safetyChecks,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repo: ${error?.message}`,
            };
        }
    }
}

export default SafetyCheckRepository;
