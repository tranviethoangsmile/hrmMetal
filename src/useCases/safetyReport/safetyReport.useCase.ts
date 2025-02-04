import { SafetyReportRepository } from '../../repositorys';
import {
    validate_create_safetyReport,
    validate_confirm_safetyReport,
    validate_update_safetyReport,
    validation_id,
} from '../../validates';

import { findUserById, getDepById } from '../index';

const safetyReportRepo = new SafetyReportRepository();

const create_safety_report_usecase = async (data: any) => {
    try {
        const isValid = validate_create_safetyReport(data);
        if (isValid?.error) {
            throw new Error(`-validate- ${isValid?.error.message}`);
        }

        const user = await findUserById(data.user_id);
        if (!user?.success) {
            throw new Error(`${user?.message}`);
        }
        const department = await getDepById(data.department_id);
        if (!department?.success) {
            throw new Error(`${department?.message}`);
        }
        const safetyReport = await safetyReportRepo.CREATE(data);
        if (!safetyReport?.success) {
            throw new Error(`${safetyReport?.message}`);
        }
        return {
            success: true,
            data: safetyReport?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `- usecase message : ${error.message}`,
        };
    }
};

const update_safety_report_usecase = async (field: any) => {
    try {
        const isValid = validate_update_safetyReport(field);
        if (isValid?.error) {
            throw new Error(`-validate- ${isValid?.error.message}`);
        }
        const safetyReport = await safetyReportRepo.GET_BY_ID(field.id);
        if (!safetyReport?.success) {
            throw new Error(`${safetyReport?.message}`);
        }

        if (safetyReport?.data?.user_id !== field.user_id) {
            throw new Error('authentication failed');
        }
        const updatedSafetyReport = await safetyReportRepo.UPDATE(field);
        if (!updatedSafetyReport?.success) {
            throw new Error(`${updatedSafetyReport?.message}`);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `- usecase message : ${error.message}`,
        };
    }
};

const confirm_safety_report_usecase = async (field: any) => {
    try {
        const isValid = validate_confirm_safetyReport(field);
        if (isValid?.error) {
            throw new Error(`-validate- ${isValid?.error.message}`);
        }
        const safetyReport = await safetyReportRepo.GET_BY_ID(field.id);
        if (!safetyReport?.success) {
            throw new Error(`${safetyReport?.message}`);
        }
        const leader = await findUserById(field.leader_id);
        if (
            !leader?.success ||
            leader.data?.role.toString().trim() === 'STAFF'
        ) {
            throw new Error(`leader not found or authenticated invalid role`);
        }
        const confirmSafetyReport = await safetyReportRepo.CONFIRM(field);
        if (!confirmSafetyReport?.success) {
            throw new Error(`${confirmSafetyReport?.message}`);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `- usecase message : ${error.message}`,
        };
    }
};

const delete_safety_report_usecase = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`-validate: ${isValid?.error.message}`);
        }
        const safetyReport = await safetyReportRepo.GET_BY_ID(id);
        if (!safetyReport?.success || safetyReport?.data?.is_confirm) {
            throw new Error(`${safetyReport?.message} or confirmed by leader`);
        }
        const deletedSafetyReport = await safetyReportRepo.DELETE(id);
        if (!deletedSafetyReport?.success) {
            throw new Error(`${deletedSafetyReport?.message}`);
        }
        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `- usecase message : ${error.message}`,
        };
    }
};

const get_all_safety_report_by_user_id_usecase = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`-validate: ${isValid?.error.message}`);
        }
        const safetyReports = await safetyReportRepo.GET_ALL_BY_USER_ID(id);
        if (!safetyReports?.success) {
            throw new Error(`${safetyReports?.message}`);
        }
        return {
            success: true,
            data: safetyReports?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `- usecase message : ${error.message}`,
        };
    }
};

const get_all_safety_report_by_department_id_usecase = async (id: string) => {
    try {
        const isValid = validation_id(id);
        if (isValid?.error) {
            throw new Error(`-validate: ${isValid?.error.message}`);
        }
        const safetyReports = await safetyReportRepo.GET_ALL_BY_DEPARTMENT_ID(
            id,
        );
        if (!safetyReports?.success) {
            throw new Error(`${safetyReports?.message}`);
        }
        return {
            success: true,
            data: safetyReports?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: `- usecase message : ${error.message}`,
        };
    }
};

export {
    create_safety_report_usecase,
    update_safety_report_usecase,
    confirm_safety_report_usecase,
    delete_safety_report_usecase,
    get_all_safety_report_by_user_id_usecase,
    get_all_safety_report_by_department_id_usecase,
};
