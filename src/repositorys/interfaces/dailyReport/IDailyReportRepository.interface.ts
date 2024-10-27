import { DailyReport } from '../../../models';

export interface IDailyReportRepository {
    daily_report_create(field: any): Promise<{
        success: boolean;
        data?: DailyReport;
        message?: string;
    }>;
    find_daily_report_by_id(id: string): Promise<{
        success: boolean;
        data?: DailyReport;
        message?: string;
    }>;
    find_all_report_of_department(field: any): Promise<{
        success: boolean;
        data?: DailyReport[];
        message?: string;
    }>;
    find_report(field: any): Promise<{
        success: boolean;
        data?: DailyReport[];
        message?: string;
    }>;
}
