import { findCodeErrorsByDailyReportIdUseCase } from '../../useCases';

const findCodeErrorsByDailyReportIdController = async (dailyReportId: string) => {
    return await findCodeErrorsByDailyReportIdUseCase(dailyReportId);
};

export { findCodeErrorsByDailyReportIdController };