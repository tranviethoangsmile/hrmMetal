import { User } from '../../../models';
import { Transaction } from 'sequelize';

export interface IUserRepository {
    DEDUCT_PAID_DAYS_OF_USER(
        user_id: string,
        days: number,
        transaction?: Transaction,
    ): Promise<{ success: boolean; data?: { paid_days: number }; message?: string }>;
    userCreate(
        user: any,
    ): Promise<{ success: boolean; data?: User; message?: string }>;
    userUpdate(field: any): Promise<{ success: boolean; message?: string }>;
    userDelete(id: string): Promise<{ success: boolean; message?: string }>;
    getUserForLeaveFeatureRepo(
        department_id: string,
    ): Promise<{ success: boolean; data?: User[]; message?: string }>;
    userFindById(
        id: string,
    ): Promise<{ success: boolean; data?: User; message?: string }>;
    userFindByName(
        name: string,
    ): Promise<{ success: boolean; data?: User[]; message?: string }>;
    userFindAllWithFieldRepo(
        field: any,
    ): Promise<{ success: boolean; data?: User[]; message?: string }>;
    userFindAll(): Promise<{
        success: boolean;
        data?: User[];
        message?: string;
    }>;
    GET_ALL_USER_FOR_OT_REQUEST_FEATURE(id: string): Promise<{
        success: boolean;
        data?: User[];
        message?: string;
    }>;
    GET_USER_BY_ID(id: string): Promise<{
        success: boolean,
        data?: User,
        message?: string
    }>
    GET_ALL_USERS_OF_POSITION_FOR_ADMIN(position: string): Promise<{
        success: boolean;
        data?: {
            rows: User[];
            count: number;
        };
        message?: string;
    }>;
}
