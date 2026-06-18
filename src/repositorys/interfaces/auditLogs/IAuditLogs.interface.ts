import { AuditLogs } from "../../../models";

export interface IAuditLogsRepository {
    CREATE(data: any):Promise<{
        success: boolean,
        data?: AuditLogs,
        message?: string
    }>
    SEARCH (field: any): Promise<{
        success: boolean,
        data?:{
            rows: AuditLogs[],
            count: number
        },
        message?: string,
    }>
}