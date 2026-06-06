"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_all_safety_report_by_department_id_usecase = exports.get_all_safety_report_by_user_id_usecase = exports.delete_safety_report_usecase = exports.confirm_safety_report_usecase = exports.update_safety_report_usecase = exports.create_safety_report_usecase = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const repositorys_1 = require("../../repositorys");
const validates_1 = require("../../validates");
const index_1 = require("../index");
const safetyReportRepo = new repositorys_1.SafetyReportRepository();
const create_safety_report_usecase = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_create_safetyReport)(data);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`-validate- ${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const user = yield (0, index_1.findUserById)(data.user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        const department = yield (0, index_1.getDepById)(data.department_id);
        if (!(department === null || department === void 0 ? void 0 : department.success)) {
            throw new Error(`${department === null || department === void 0 ? void 0 : department.message}`);
        }
        const safetyReport = yield safetyReportRepo.CREATE(data);
        if (!(safetyReport === null || safetyReport === void 0 ? void 0 : safetyReport.success)) {
            throw new Error(`${safetyReport === null || safetyReport === void 0 ? void 0 : safetyReport.message}`);
        }
        return {
            success: true,
            data: safetyReport === null || safetyReport === void 0 ? void 0 : safetyReport.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `- usecase message : ${error.message}`,
        };
    }
});
exports.create_safety_report_usecase = create_safety_report_usecase;
const update_safety_report_usecase = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_update_safetyReport)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`-validate- ${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const safetyReport = yield safetyReportRepo.GET_BY_ID(field.id);
        if (!(safetyReport === null || safetyReport === void 0 ? void 0 : safetyReport.success)) {
            throw new Error(`${safetyReport === null || safetyReport === void 0 ? void 0 : safetyReport.message}`);
        }
        const updatedSafetyReport = yield safetyReportRepo.UPDATE(field);
        if (!(updatedSafetyReport === null || updatedSafetyReport === void 0 ? void 0 : updatedSafetyReport.success)) {
            throw new Error(`${updatedSafetyReport === null || updatedSafetyReport === void 0 ? void 0 : updatedSafetyReport.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `- usecase message : ${error.message}`,
        };
    }
});
exports.update_safety_report_usecase = update_safety_report_usecase;
const confirm_safety_report_usecase = (field) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const isValid = (0, validates_1.validate_confirm_safetyReport)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`-validate- ${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const safetyReport = yield safetyReportRepo.GET_BY_ID(field.id);
        if (!(safetyReport === null || safetyReport === void 0 ? void 0 : safetyReport.success)) {
            throw new Error(`${safetyReport === null || safetyReport === void 0 ? void 0 : safetyReport.message}`);
        }
        const leader = yield (0, index_1.findUserById)(field.leader_id);
        if (!(leader === null || leader === void 0 ? void 0 : leader.success) ||
            ((_a = leader.data) === null || _a === void 0 ? void 0 : _a.role.toString().trim()) === 'STAFF') {
            throw new Error(`leader not found or authenticated invalid role`);
        }
        const confirmSafetyReport = yield safetyReportRepo.CONFIRM(field);
        if (!(confirmSafetyReport === null || confirmSafetyReport === void 0 ? void 0 : confirmSafetyReport.success)) {
            throw new Error(`${confirmSafetyReport === null || confirmSafetyReport === void 0 ? void 0 : confirmSafetyReport.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `- usecase message : ${error.message}`,
        };
    }
});
exports.confirm_safety_report_usecase = confirm_safety_report_usecase;
const delete_safety_report_usecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`-validate: ${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const safetyReport = yield safetyReportRepo.GET_BY_ID(id);
        if (!(safetyReport === null || safetyReport === void 0 ? void 0 : safetyReport.success) || ((_b = safetyReport === null || safetyReport === void 0 ? void 0 : safetyReport.data) === null || _b === void 0 ? void 0 : _b.is_confirm)) {
            throw new Error(`${safetyReport === null || safetyReport === void 0 ? void 0 : safetyReport.message} or confirmed by leader`);
        }
        const deletedSafetyReport = yield safetyReportRepo.DELETE(id);
        if (!(deletedSafetyReport === null || deletedSafetyReport === void 0 ? void 0 : deletedSafetyReport.success)) {
            throw new Error(`${deletedSafetyReport === null || deletedSafetyReport === void 0 ? void 0 : deletedSafetyReport.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `- usecase message : ${error.message}`,
        };
    }
});
exports.delete_safety_report_usecase = delete_safety_report_usecase;
const get_all_safety_report_by_user_id_usecase = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_get_by_user_id)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`-validate: ${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const safetyReports = yield safetyReportRepo.GET_ALL_BY_USER_ID({
            user_id: field.user_id,
            year: (0, moment_timezone_1.default)(field.date).format('yyyy'),
            month: (0, moment_timezone_1.default)(field.date).format('MM'),
        });
        if (!(safetyReports === null || safetyReports === void 0 ? void 0 : safetyReports.success)) {
            throw new Error(`${safetyReports === null || safetyReports === void 0 ? void 0 : safetyReports.message}`);
        }
        return {
            success: true,
            data: safetyReports === null || safetyReports === void 0 ? void 0 : safetyReports.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `- usecase message : ${error.message}`,
        };
    }
});
exports.get_all_safety_report_by_user_id_usecase = get_all_safety_report_by_user_id_usecase;
const get_all_safety_report_by_department_id_usecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`-validate: ${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const safetyReports = yield safetyReportRepo.GET_ALL_BY_DEPARTMENT_ID(id);
        if (!(safetyReports === null || safetyReports === void 0 ? void 0 : safetyReports.success)) {
            throw new Error(`${safetyReports === null || safetyReports === void 0 ? void 0 : safetyReports.message}`);
        }
        return {
            success: true,
            data: safetyReports === null || safetyReports === void 0 ? void 0 : safetyReports.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `- usecase message : ${error.message}`,
        };
    }
});
exports.get_all_safety_report_by_department_id_usecase = get_all_safety_report_by_department_id_usecase;
