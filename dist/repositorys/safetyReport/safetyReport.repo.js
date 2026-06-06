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
const models_1 = require("../../models");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const sequelize_1 = require("sequelize");
class SafetyReportRepository {
    CREATE(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const safetyReport = yield models_1.SafetyReport.create(Object.assign({}, field));
                if (safetyReport === null) {
                    throw new Error(`create safetyReport not successfully`);
                }
                return {
                    success: true,
                    data: safetyReport,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    UPDATE(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.SafetyReport.update(field, {
                    where: {
                        id: field.id,
                    },
                });
                if (result[0] < 1) {
                    throw new Error(`update safetyReport not successfully`);
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    CONFIRM(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.SafetyReport.update({
                    leader_id: field.leader_id,
                    is_confirm: true,
                    corrective_action: field.corrective_action,
                }, {
                    where: {
                        id: field.id,
                    },
                });
                if (result[0] < 1) {
                    throw new Error(`confirm safetyReport not successfully`);
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    GET_BY_ID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const safetyReport = yield models_1.SafetyReport.findByPk(id);
                if (safetyReport === null) {
                    throw new Error(`safetyReport not found`);
                }
                return {
                    success: true,
                    data: safetyReport,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    DELETE(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.SafetyReport.destroy({
                    where: {
                        id: id,
                    },
                });
                if (result < 1) {
                    throw new Error(`delete safetyReport not successfully`);
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    GET_ALL_BY_USER_ID(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startDate = (0, moment_timezone_1.default)(`${field.year}-${field.month}-01`, 'YYYY-MM-DD').format('YYYY-MM-DD');
                const endDate = (0, moment_timezone_1.default)(startDate, 'YYYY-MM-DD')
                    .endOf('month')
                    .format('YYYY-MM-DD');
                const safetyReports = yield models_1.SafetyReport.findAll({
                    where: {
                        user_id: field.user_id,
                        date: {
                            [sequelize_1.Op.gte]: startDate,
                            [sequelize_1.Op.lte]: endDate,
                        },
                    },
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'is_confirm',
                        'solution',
                        'corrective_action',
                        'media_path',
                        'date',
                        'leader_id',
                        'department_id',
                    ],
                });
                if (safetyReports === null || safetyReports.length < 1) {
                    throw new Error(`safetyReport not found`);
                }
                return {
                    success: true,
                    data: safetyReports,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    GET_ALL_BY_DEPARTMENT_ID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const safetyReports = yield models_1.SafetyReport.findAll({
                    where: {
                        department_id: id,
                        is_confirm: false,
                    },
                });
                if (safetyReports === null || safetyReports.length < 1) {
                    throw new Error(`safetyReport not found`);
                }
                return {
                    success: true,
                    data: safetyReports,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
}
exports.default = SafetyReportRepository;
