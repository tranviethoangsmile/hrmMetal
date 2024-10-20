import { Inventory } from '../../../models';

export interface IInventoryRepository {
    create(field: any): Promise<{
        success: boolean;
        data?: Inventory;
        message?: string;
    }>;
    search_inventory_with_name(field: any): Promise<{
        success: boolean;
        data?: Inventory[];
        message?: string;
    }>;
    get_all_inventory_repo(): Promise<{
        success: boolean;
        data?: Inventory[];
        message?: string;
    }>;
    update_inventory_repo(field: any): Promise<{
        success: boolean;
        message?: string;
    }>;
}
