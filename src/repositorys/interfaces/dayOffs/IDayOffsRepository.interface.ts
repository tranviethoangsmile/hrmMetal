import { DayOffs } from '../../../models';
export interface IDayOffs {
    CREATE(field: any): Promise<{
        success: boolean;
        data?: DayOffs;
        message?: string;
    }>;
    // UPDATE(field: any): Promise<{
    //     success: boolean;
    //     message?: string;
    // }>;
    DELETE(id: string): Promise<{
        success: boolean;
        message?: string;
    }>;
    GET_ALL(): Promise<{
        success: boolean;
        data?: DayOffs[];
        message?: string;
    }>;
    GET_BY_ID(id: string): Promise<{
        success: boolean;
        data?: DayOffs;
        message?: string;
    }>;
    // GET_BY_USER_ID(id: string): Promise<{
    //     success: boolean;
    //     data?: DayOffs[];
    //     message?: string;
    // }>;
    // GET_BY_DATE(date: string): Promise<{
    //     success: boolean;
    //     data?: DayOffs;
    //     message?: string;
    // }>;
}
