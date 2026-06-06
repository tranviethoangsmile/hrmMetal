import { PaidLeaveRequest } from '../../../models';

export interface IPaidLeaveRequestRepo {
    CREATE_PAID_LEAVE_REQUEST(
        field: any,
    ): Promise<{ success: boolean; data?: PaidLeaveRequest; message?: string }>;
    GET_ALL_PAID_LEAVE_REQUEST_FOR_LEADER_AND_OTHER(leader_id: string): Promise<{
        success: boolean;
        data?: {
            rows: PaidLeaveRequest[],
            count: number
        };
        message?: string;
    }>;
    UPDATE_ACTIVE_PAID_LEAVE_REQUEST(
        id: string,
    ): Promise<{ success: boolean; message?: string }>;
    SEARCH_PAID_LEAVE_REQUEST_WITH_FIELD(field: any): Promise<{
        success: boolean;
        data?: PaidLeaveRequest[];
        message?: string;
    }>;
    UPDATE_APPROVE_PAID_LEAVE_REQUEST(
        field: any,
    ): Promise<{ success: boolean; message?: string }>;
    UPDATE_CONFIRM_PAID_LEAVE_REQUEST_FROM_ADMIN(
        field: any,
    ): Promise<{ success: boolean; message?: string }>;
    GET_PAID_LEAVE_REQUEST_BY_ID(
        id: string,
    ): Promise<{ success: boolean; data?: PaidLeaveRequest; message?: string }>;
    DELETE_PAID_LEAVE_REQUEST_BY_ID_REPO(
        id: string,
    ): Promise<{ success: boolean; message?: string }>;
    GET_ALL_PAID_LEAVE_APPROVED_FOR_ADMIN(position: string) : Promise<{
        success: boolean,
        data?:{
            rows: PaidLeaveRequest[],
            count: number
        },
        message?: string
    }>
}
