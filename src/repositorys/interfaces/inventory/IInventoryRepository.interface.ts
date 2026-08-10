import { Inventory } from '../../../models';

export interface IInventoryRepository {
    CREATE(field: any): Promise<{
        success: boolean;
        data?: Inventory;
        message?: string;
    }>;
    SEARCH_INVENTORY_WITH_NAME(field: any): Promise<{
        success: boolean;
        data?: Inventory[];
        message?: string;
    }>;
    GET_ALL_INVENTORY(): Promise<{
        success: boolean;
        data?: Inventory[];
        message?: string;
    }>;
    UPDATE_INVENTORY(field: any): Promise<{
        success: boolean;
        message?: string;
    }>;
    GET_INVENTORY_BY_ID(id: string): Promise<{
        success: boolean;
        message?: string;
        data?: Inventory;
    }>;
}
