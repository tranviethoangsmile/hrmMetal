import { adminDashboardSummaryUseCase } from "../../../../../useCases";

const adminDashboardSummaryController = async (position: string, date: string) => {
    return await adminDashboardSummaryUseCase(position, date)
} 

export { adminDashboardSummaryController } 