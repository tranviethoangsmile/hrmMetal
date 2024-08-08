import { Events } from '../../../models';

export interface IEventRepository {
    create_events_repo(field: any): Promise<{
        success: boolean;
        data?: Events;
        message?: string;
    }>;
    delete_events_repo(id: string): Promise<{
        success: boolean;
        message?: string;
    }>;
    update_events_repo(field: any): Promise<{
        success: boolean;
        message?: string;
    }>;
    search_event_by_id_repo(id: string): Promise<{
        success: boolean;
        data?: Events;
        message?: string;
    }>;
    get_all_event_repo(): Promise<{
        success: boolean;
        data?: Events[];
        message?: string;
    }>;
}
