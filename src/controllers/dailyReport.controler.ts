import { create_daily_report, find_all_rp, search_daily_report } from '../useCases/dailyReport.useCase'


const daily_report_create = async (data: any) => {
    return await create_daily_report(data)
}

const find_all_report = async () => {
    return await find_all_rp();
}

const find_report = async (data: any) => {
    return await search_daily_report(data)
}

export { daily_report_create, find_all_report, find_report }