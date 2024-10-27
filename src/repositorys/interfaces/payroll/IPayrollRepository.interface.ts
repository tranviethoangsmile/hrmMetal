import { Payroll } from '../../../models';

export interface IPayrollRepository {
    create_payroll_repo(
        field: any,
    ): Promise<{ success: boolean; data?: Payroll; message?: string }>;
    destroy_payroll_repo(
        id: string,
    ): Promise<{ success: boolean; message?: string }>;
    update_payroll_repo(
        field: any,
    ): Promise<{ success: boolean; message?: string }>;
    search_payroll_by_id_repo(
        id: string,
    ): Promise<{ success: boolean; data?: Payroll; message?: string }>;
    search_payroll_of_user_in_month_repo(
        field: any,
    ): Promise<{ success: boolean; data?: Payroll; message?: string }>;
}
