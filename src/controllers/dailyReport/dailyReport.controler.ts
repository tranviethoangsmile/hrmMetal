import {
    create_daily_report_use,
    find_all_report_use,
    search_daily_report,
    find_rp_by_id,
} from '../../useCases/dailyReport/dailyReport.useCase';

const daily_report_create = async (data: any) => {
    return await create_daily_report_use(data);
};

const find_all_report = async (field: any) => {
    return await find_all_report_use({ ...field });
};

const find_report = async (data: any) => {
    return await search_daily_report(data);
};

const find_report_by_id = async (id: any) => {
    return await find_rp_by_id(id);
};

export { daily_report_create, find_all_report, find_report, find_report_by_id };
