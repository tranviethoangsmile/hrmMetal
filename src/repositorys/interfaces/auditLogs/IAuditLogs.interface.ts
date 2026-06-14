import { AuditLogs } from "../../../models";

export interface IAuditLogsRepository {
    CREATE(data: any):Promise<{
        success: boolean,
        data?: AuditLogs,
        message?: string
    }>
}