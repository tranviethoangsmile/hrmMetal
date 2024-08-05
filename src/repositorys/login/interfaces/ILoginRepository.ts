import { token_payload } from '../../../interfaces/login/login.interface';
export interface ILoginRepository {
    login(user: any): Promise<{
        success: boolean;
        data?: token_payload;
        token?: string;
        message?: string;
    }>;
}
