import { AuditLogs } from "../../models";
import { IAuditLogsRepository } from "../interfaces";

class AuditLogsRepository implements IAuditLogsRepository {
    async CREATE(data: any){
        try {
            const writeLogs: AuditLogs = await AuditLogs.create({
                ...data
            })
            if(!writeLogs){
                throw new Error(`create logs error`)
            }
            return {
                success: true,
                data: writeLogs
            }
        } catch (error: any) {
            return {
                success: false,
                message: `repository return error: ${error?.message}`
            }
        }
    }
}

export default AuditLogsRepository;