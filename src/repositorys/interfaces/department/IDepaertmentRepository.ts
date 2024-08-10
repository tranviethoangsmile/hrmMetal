import { Department } from '../../../models';

export interface IDepartmentRepository {
    createDepartment(field: any): Promise<{
        success: boolean;
        data?: Department;
        message?: string;
    }>;
    departmentList(): Promise<{
        success: boolean;
        data?: Department[];
        message?: string;
    }>;
    getDepartmentById(id: string): Promise<{
        success: boolean;
        data?: Department;
        message?: string;
    }>;
}
