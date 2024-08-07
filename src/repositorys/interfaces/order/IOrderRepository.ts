import { Order } from '../../../models';

export interface IOrderRepository {
    create(
        field: any,
    ): Promise<{ success: boolean; data?: Order; message?: string }>;
    find_all_order(): Promise<{
        success: boolean;
        data?: Order[];
        message?: string;
    }>;
    find_order(
        field: any,
    ): Promise<{ success: boolean; data?: Order[]; message?: string }>;
    delete_order(id: string): Promise<{ success: boolean; message?: string }>;
    search_order_for_user_in_month(
        id: string,
    ): Promise<{ success: boolean; data?: Order[]; message?: string }>;
    find_one_order(
        id: string,
    ): Promise<{ success: boolean; data?: Order; message?: string }>;
    checkin_picked_order(
        field: any,
    ): Promise<{ success: boolean; message?: string }>;
}
