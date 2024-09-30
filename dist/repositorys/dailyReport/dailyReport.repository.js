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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const models_2 = require("../../models");
class DailyReportRepository {
    daily_report_create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_daily_report = yield models_1.DailyReport.create(Object.assign({}, data));
                if (new_daily_report === null) {
                    throw new Error('creating daily report error');
                }
                return {
                    success: true,
                    data: new_daily_report,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error === null || error === void 0 ? void 0 : error.message} repo`,
                };
            }
        });
    }
    find_report(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield models_1.DailyReport.findAll({
                    where: Object.assign({}, field),
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
                                    model: models_2.Department,
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
                if (reports === null || reports.length < 1) {
                    throw new Error('find daily report not found or error');
                }
                return {
                    success: true,
                    data: reports,
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
    find_all_report_of_department(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield models_1.DailyReport.findAll({
                    where: Object.assign({}, field),
                    order: [['date', 'DESC']],
                    limit: 7,
                    attributes: [
                        'product',
                        'date',
                        'user_id',
                        'shift',
                        'quantity',
                        'operated_time',
                        'shutdown_time',
                        'operator_history',
                        'department_id',
                    ],
                    include: [
                        {
                            model: models_1.User,
                            attributes: ['name'],
                            include: [
                                {
                                    model: models_2.Department,
                                    as: 'department',
                                    attributes: ['name'],
                                },
                            ],
                        },
                    ],
                });
                if (reports === null || reports.length < 1) {
                    throw new Error('report not found or error');
                }
                return {
                    success: true,
                    data: reports,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    find_daily_report_by_id(id) {
        return __awaiter(this, void 0, void 0, function* () {
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
                                    model: models_2.Department,
                                    as: 'department',
                                    attributes: ['name'],
                                },
                            ],
                        },
                    ],
                });
                if (report === null) {
                    throw new Error('daily report not found');
                }
                return {
                    success: true,
                    data: report,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
}
exports.default = DailyReportRepository;
