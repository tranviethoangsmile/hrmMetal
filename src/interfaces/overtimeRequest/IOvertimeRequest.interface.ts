export interface ICreateOvertimeRequest {
    user_id: string;
    department_id: string;
    leader_id: string;
    admin_id?: string | null;
    position: string;
    date: Date | string;
    overtime_hours: number;
    reason: string;
    is_confirm?: boolean;
    is_approved?: boolean;
}
