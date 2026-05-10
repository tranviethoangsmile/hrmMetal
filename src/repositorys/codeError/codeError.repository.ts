import { CodeError } from '../../models';
import { Transaction } from 'sequelize';
import { ICodeErrorsRepository } from '../interfaces';

class CodeErrorsRepository implements ICodeErrorsRepository {
    async CREATE(codeErrors: any[], transaction?: Transaction) {
        try {
            const newCodeErrors = await CodeError.bulkCreate(codeErrors, { transaction });
            return {
                success: true,
                data: newCodeErrors,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async FIND_BY_DAILY_REPORT_ID(dailyReportId: string) {
        try {
            const codeErrors: CodeError[] | null = await CodeError.findAll(
                {
                     where:
                      {
                         daily_report_id: dailyReportId },
                         attributes: [
                            'code',
                            'description',
                            'shutdown_time',
                            'error_date',
                        ],
                    });
            if (codeErrors === null || codeErrors.length < 1) {
                throw new Error('code errors not found');
            }
            return { 
                success: true, 
                data: codeErrors
            };
        } catch (error: any) {
            return { 
                success: false, 
                message: error.message 
            };
        }
    }
}

export default CodeErrorsRepository;