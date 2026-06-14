import { AuditLogsRepository } from "../../repositorys";
import { CREATE_LOGS_VALIDATE } from "../../validates";
import { isValidEnumValue } from "../../helpers";
import { LOGS_ACTION_ENUM } from "../../enum";
const auditLogsRepo = new AuditLogsRepository();

const CREATE_LOGS_USECASE = async (value: any) => {
    try {
        const isValid = CREATE_LOGS_VALIDATE(value);
        if(isValid?.error) {
            throw new Error(`${isValid?.error?.message}`)
        }
        if(!isValidEnumValue(value?.action, LOGS_ACTION_ENUM)) {
            throw new Error (`action not avaliable ${value?.action}`)
        }
        const write_logs = await auditLogsRepo.CREATE(value);
        if(!write_logs?.success) {
            throw new Error(`${write_logs?.message}`)
        }
        return {
            success: true
        }
    } catch (error: any) {
        return {
            success: false,
            messages: `${error?.messages}`
        }
    }
}

export { CREATE_LOGS_USECASE }