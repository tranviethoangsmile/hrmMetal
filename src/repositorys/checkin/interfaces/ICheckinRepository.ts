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
}
