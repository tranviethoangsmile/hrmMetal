import { SafetyReport } from '../../../models';

export interface ISafetyReport {
    CREATE(field: any): Promise<{
        success: boolean;
        data?: SafetyReport;
        message?: string;
    }>;
    UPDATE(field: any): Promise<{
        success: boolean;
        message?: string;
    }>;
    CONFIRM(field: any): Promise<{
        success: boolean;
        message?: string;
    }>;
    GET_BY_ID(id: string): Promise<{
        success: boolean;
        data?: SafetyReport;
        message?: string;
    }>;
    DELETE(id: string): Promise<{
        success: boolean;
        message?: string;
    }>;
    GET_ALL_BY_USER_ID(id: string): Promise<{
        success: boolean;
        data?: SafetyReport[];
        message?: string;
    }>;
    GET_ALL_BY_DEPARTMENT_ID(id: string): Promise<{
        success: boolean;
        data?: SafetyReport[];
        message?: string;
    }>;
}
