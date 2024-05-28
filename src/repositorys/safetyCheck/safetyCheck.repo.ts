import { SafetyChecks } from '../../models';

const create_safety_check_repo = async (field: any) => {
    try {
        const safety_check: SafetyChecks | null = await SafetyChecks.create({
            ...field,
        });
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
};

const search_safety_checked_repo = async (field: any) => {
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
};
export { create_safety_check_repo, search_safety_checked_repo };
