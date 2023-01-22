import { create_daily_report } from '../useCases/dailyReport.useCase'


const daily_report_create = async (data: any) => {
    return await create_daily_report(data)
}

export { daily_report_create }