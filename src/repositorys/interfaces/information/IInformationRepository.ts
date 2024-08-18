import { Information } from '../../../models';

export interface IInformationRepository {
    create_information_repo(field: any): Promise<{
        success: boolean;
        data?: Information;
        message?: string;
    }>;
    search_information_of_user_repo(id: string): Promise<{
        success: boolean;
        data?: Information[];
        message?: string;
    }>;
    search_information_by_id_repo(id: string): Promise<{
        success: boolean;
        data?: Information;
        message?: string;
    }>;
    search_information_all_with_field_repo(field: any): Promise<{
        success: boolean;
        data?: Information[];
        message?: string;
    }>;
    delete_information_by_id_repo(id: string): Promise<{
        success: boolean;
        message?: string;
    }>;
}
