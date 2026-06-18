import { Op } from "sequelize";
import { AuditLogs, User } from "../../models";
import { IAuditLogsRepository } from "../interfaces";

class AuditLogsRepository implements IAuditLogsRepository {
    async CREATE(data: any) {
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

    async SEARCH(field: any) {
        try {
            const page  = field.page  ?? 1;
            const limit = field.limit ?? 20;
            const offset = (page - 1) * limit;

            const where: any = {};
            if (field.resource_type) where.resource_type = field.resource_type;
            if (field.actor_id)      where.actor_id = field.actor_id;
            if (field.from || field.to) {
                where.created_at = {};
                if (field.from) where.created_at[Op.gte] = new Date(field.from);
                if (field.to)   where.created_at[Op.lte] = new Date(field.to);
            }

            const auditlogs: {rows: AuditLogs[], count: number} = await AuditLogs.findAndCountAll({
                where,
                include: [{ model: User, as: 'actorDetail', attributes: ['id', 'name', 'employee_id'] }],
                order: [['created_at', 'DESC']],
                limit,
                offset,
            });

            return { 
                success: true, 
                data: 
                {
                rows: auditlogs.rows,
                count: auditlogs.count
            } 
        };
        } catch (error: any) {
            return { 
                success: false, 
                message: `repo: ${error.message}` 
            };
        }
    }
}

export default AuditLogsRepository;