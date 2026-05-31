import { adminDashboardSummaryUseCase } from "../../../useCases";

const adminDashboardSummaryController = async (position: string) => {
    return await adminDashboardSummaryUseCase(position)
} 

export { adminDashboardSummaryController }