import { OvertimeRequest } from '../../../models';

export interface IOvertimeRequestRepo {
    CREATE(
        data: any,
    ): Promise<{ success: boolean; data?: OvertimeRequest; message?: string }>;
    // FIND_ALL(): Promise<{
    //     success: boolean;
    //     data?: OvertimeRequest[];
    //     message?: string;
    // }>;
    // DELETE(id: string): Promise<{ success: boolean; message?: string }>;
    // FIND_BY_ID(
    //     id: string,
    // ): Promise<{ success: boolean; data?: OvertimeRequest; message?: string }>;
    // UPDATE_CONFIRM(data: any): Promise<{ success: boolean; message?: string }>;
    // UPDATE_APPROVE_ADMIN(
    //     data: any,
    // ): Promise<{ success: boolean; message?: string }>;
}
