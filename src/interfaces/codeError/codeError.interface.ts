interface ICreate_code_error {
    code: string;
    description: string;
    shutdown_time: number;
    error_date: string;
    daily_report_id: string;
}

interface ISearch_code_error {
    code?: string;
    description?: string;
    shutdown_time?: number;
    error_date?: string;
    daily_report_id?: string;
}

export { ICreate_code_error, ISearch_code_error };
