import { User } from '../../../models';

export interface IUserRepository {
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
}
