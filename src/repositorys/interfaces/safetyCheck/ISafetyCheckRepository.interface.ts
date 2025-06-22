import { SafetyChecks } from '../../../models';

export interface ISafetyCheckRepository {
    create_safety_check_repo(
        field: any,
    ): Promise<{ success: boolean; data?: SafetyChecks; message?: string }>;
    search_safety_checked_repo(field: any): Promise<{
        success: boolean;
        data?: SafetyChecks;
        message?: string;
    }>;
    GET_ALL_USER_CHECKED_SAFETY_CHECK_EVENT(id: string): Promise<{
        success: boolean;
        data?: SafetyChecks[];
        message?: string;
    }>;
}
