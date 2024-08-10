import { EventChecks } from '../../../models';

export interface IEvencheckRepository {
    create_event_check_repo(field: any): Promise<{
        success: boolean;
        data?: EventChecks;
        message?: string;
    }>;
    search_event_checked_repo(field: any): Promise<{
        success: boolean;
        data?: EventChecks;
        message?: string;
    }>;
}
