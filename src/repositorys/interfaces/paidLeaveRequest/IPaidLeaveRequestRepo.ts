import { PaidLeaveRequest } from '../../../models';

export interface IPaidLeaveRequestRepo {
    create_paid_leave_request(
        field: any,
    ): Promise<{ success: boolean; data?: PaidLeaveRequest; message?: string }>;
    find_all_paid_leave(): Promise<{
        success: boolean;
        data?: PaidLeaveRequest[];
        message?: string;
    }>;
    update_active_paid_leave(
        id: string,
    ): Promise<{ success: boolean; message?: string }>;
    search_leave_request_with_field_repo(field: any): Promise<{
        success: boolean;
        data?: PaidLeaveRequest[];
        message?: string;
    }>;
    update_un_approve_leave_request_repo(
        field: any,
    ): Promise<{ success: boolean; message?: string }>;
    update_confirm_from_admin_paid_leave_request_repo(
        field: any,
    ): Promise<{ success: boolean; message?: string }>;
    get_paid_lead_with_id_repo(
        id: string,
    ): Promise<{ success: boolean; data?: PaidLeaveRequest; message?: string }>;
}
