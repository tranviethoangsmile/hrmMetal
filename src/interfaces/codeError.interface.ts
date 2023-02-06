import { DailyReport } from "../models";
interface create_code_error {
    code : string;
    description : string;
    shutdown_time : number;
    daily_report_id : string;
}

interface search_code_error {
    code ?: string;
    description ?: string;
    shutdown_time ?: number;
    daily_report_id ?: string;
}

export { create_code_error, search_code_error }