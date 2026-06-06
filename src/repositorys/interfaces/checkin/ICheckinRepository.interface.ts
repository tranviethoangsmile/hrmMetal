import { Checkin } from '../../../models';
export interface ICheckinRepository {
    create_checkin(
        data: any,
    ): Promise<{ success: boolean; data?: Checkin; message?: string }>;
    update_checkin(field: any): Promise<{ success: boolean; message?: string }>;
    isChecked(
        field: any,
    ): Promise<{ success: boolean; data?: Checkin; message?: string }>;
    search_checkin_of_user_in_month(
        field: any,
    ): Promise<{ success: boolean; data?: Checkin[]; message?: string }>;
    get_checkin_of_position_in_date_repo(
        field: any,
    ): Promise<{ success: boolean; data?: Checkin[]; message?: string }>;
    get_checkin_detail_in_date_of_user_repo(
        field: any,
    ): Promise<{ success: boolean; data?: Checkin; message?: string }>;
    GET_ALL_CHECKINS_OF_POSITION_IN_DATE_FOR_ADMIN(
        position: string,
        date: string,
    ): Promise<{ success: boolean; data?: {
        rows: Checkin[],
        count: number
    }; message?: string }>;
    GET_ALL_PAID_LEAVE_OF_POSITION_IN_DATE_FOR_ADMIN(
        position: string,
        date: string,
    ): Promise<{ success: boolean; data?: {
        rows: Checkin[],
        count: number
    }; message?: string }>;
}
