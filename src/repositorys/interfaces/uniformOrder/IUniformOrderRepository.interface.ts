import { UniformOrder } from '../../../models';

export interface IUniformOrder {
    create(field: any): Promise<{
        success: boolean;
        data?: UniformOrder;
        message?: string;
    }>;
    // search_all_uniform_order_by_position(position: string): Promise<{
    //     success: boolean;
    //     data?: UniformOrder[];
    //     message?: string;
    // }>;
    // search_all_uniform_order_by_user_id(id: string): Promise<{
    //     success: boolean;
    //     data?: UniformOrder[];
    //     message?: string;
    // }>;
    // delete_uniform_order_by_id(id: string): Promise<{
    //     success: boolean;
    //     message?: string;
    // }>;
    // order_detail_by_id(id: string): Promise<{
    //     success: boolean;
    //     data?: UniformOrder;
    //     message?: string;
    // }>;
    // update_uniform_order_by_field(field: any): Promise<{
    //     success: boolean;
    //     message?: string;
    // }>;
}
