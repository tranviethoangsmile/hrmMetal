import { create_daily_report, find_all_rp } from '../useCases/dailyReport.useCase'


const daily_report_create = async (data: any) => {
    return await create_daily_report(data)
}

const find_all_report = async () => {
    return await find_all_rp();
}

export { daily_report_create, find_all_report }