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
exports.find_report = exports.find_report_all = exports.find_daily_report_by_id = exports.daily_report_create = void 0;
const models_1 = require("../models");
const user_repository_1 = require("./user.repository");
const department_model_1 = __importDefault(require("../models/department.model"));
const daily_report_create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_repository_1.userFindById)(data.user_id);
        if (user === null || user === void 0 ? void 0 : user.success) {
            const new_daily_report = yield models_1.DailyReport.create(Object.assign(Object.assign({}, data), { user }));
            if (new_daily_report != null) {
                return {
                    success: true,
                    data: new_daily_report,
                };
            }
            else {
                return {
                    success: false,
                    message: 'create daily report failed',
                };
            }
        }
        else {
            return {
                success: false,
                message: 'user not found in daily report',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.daily_report_create = daily_report_create;
const find_report = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield models_1.DailyReport.findAll({
            where: Object.assign({}, data),
            attributes: [
                'product',
                'date',
                'shift',
                'quantity',
                'operated_time',
                'shutdown_time',
                'active_time',
                'operator_history',
            ],
            include: [
                {
                    model: models_1.User,
                    attributes: ['name'],
                    include: [
                        {
                            model: department_model_1.default,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
                {
                    model: models_1.CodeError,
                    attributes: [
                        'code',
                        'description',
                        'shutdown_time',
                        'daily_report_id',
                    ],
                },
            ],
        });
        if (reports != null) {
            return {
                success: true,
                data: reports,
            };
        }
        else {
            return {
                success: false,
                message: 'daily report not found',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
});
exports.find_report = find_report;
const find_report_all = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield models_1.DailyReport.findAll({
            attributes: [
                'product',
                'date',
                'shift',
                'quantity',
                'operated_time',
                'shutdown_time',
                'active_time',
                'operator_history',
            ],
            include: [
                {
                    model: models_1.User,
                    attributes: ['name'],
                    include: [
                        {
                            model: department_model_1.default,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
                {
                    model: models_1.CodeError,
                    attributes: [
                        'code',
                        'description',
                        'shutdown_time',
                        'daily_report_id',
                    ],
                },
            ],
        });
        if (reports != null) {
            return {
                success: true,
                data: reports,
            };
        }
        else {
            return {
                success: false,
                message: 'daily report not found',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.find_report_all = find_report_all;
const find_daily_report_by_id = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const report = yield models_1.DailyReport.findOne({
            where: {
                id: id,
            },
            attributes: [
                'product',
                'date',
                'shift',
                'quantity',
                'operator_history',
                'operated_time',
                'shutdown_time',
                'active_time',
            ],
            include: [
                {
                    model: models_1.User,
                    attributes: ['name'],
                    as: 'user',
                    include: [
                        {
                            model: department_model_1.default,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });
        if (report != null) {
            return {
                success: true,
                data: report,
            };
        }
        else {
            return {
                success: false,
                message: 'Report not found',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.find_daily_report_by_id = find_daily_report_by_id;
