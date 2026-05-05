import { Transaction } from 'sequelize';
import { CodeError } from '../../../models';

interface ICodeErrorsRepository {
    CREATE(codeErrors: any[], transaction?: Transaction): Promise<{
        success: boolean;
        data?: CodeError[];
        message?: string;
    }>;
    // FIND_ALL(filter: any): Promise<{
    //     success: boolean;
    //     data?: CodeError[];
    //     message?: string;
    // }>;
    // findCodeErrorById(id: string): Promise<{
    //     success: boolean;
    //     data?: CodeError;
    //     message?: string;
    // }>;
    FIND_BY_DAILY_REPORT_ID(dailyReportId: string): Promise<{
        success: boolean;
        data?: CodeError[];
        message?: string;
    }>;
    // findCodeErrorByCode(code: string): Promise<{
    //     success: boolean;
    //     data?: CodeError;
    //     message?: string;
    // }>;
    // findCodeErrorByErrorDate(errorDate: string): Promise<{
    //     success: boolean;
    //     data?: CodeError[];
    //     message?: string;
    // }>;
    
}

export { ICodeErrorsRepository };