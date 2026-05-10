import { CodeErrorsRepository } from '../../repositorys';
import { validation_id } from '../../validates';
const codeErrorsRepository = new CodeErrorsRepository();

const findCodeErrorsByDailyReportIdUseCase = async (dailyReportId: string) => {
    try {
        const valid = validation_id(dailyReportId);
        if (valid?.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const result = await codeErrorsRepository.FIND_BY_DAILY_REPORT_ID(dailyReportId);
        if (!result?.success) {
            throw new Error(result?.message || 'Failed to find code errors');
        }
        return {
            success: true,
            data: result?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
}

export { findCodeErrorsByDailyReportIdUseCase };