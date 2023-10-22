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
exports.find_rp_by_id = exports.search_daily_report = exports.find_all_rp = exports.create_daily_report = void 0;
const dailyReport_repository_1 = require("../repositorys/dailyReport.repository");
const dailyReport_validate_1 = require("../validates/dailyReport.validate");
const validates_1 = require("../validates");
const Product_enum_1 = require("../enum/Product.enum");
const codeError_useCase_1 = require("./codeError.useCase");
const search_daily_report = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = yield (0, dailyReport_validate_1.valid_search_daily_report)(data);
        if (!(valid === null || valid === void 0 ? void 0 : valid.error)) {
            const reports = yield (0, dailyReport_repository_1.find_report)(data);
            if (reports === null || reports === void 0 ? void 0 : reports.success) {
                return {
                    success: true,
                    data: reports === null || reports === void 0 ? void 0 : reports.data,
                };
            }
            else {
                return {
                    success: false,
                    message: 'report not found',
                };
            }
        }
        else {
            return {
                success: false,
                message: valid === null || valid === void 0 ? void 0 : valid.error.message,
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
exports.search_daily_report = search_daily_report;
const create_daily_report = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const rp_field_create = data.rp;
        const valid = (0, dailyReport_validate_1.valid_create_daily_report)(rp_field_create);
        const errors = data.err;
        if (!valid.error) {
            if (typeof rp_field_create.product === 'string' &&
                Object.values(Product_enum_1.Products).includes(rp_field_create.product)) {
                const rep_rp = yield (0, dailyReport_repository_1.daily_report_create)(rp_field_create);
                if (rep_rp === null || rep_rp === void 0 ? void 0 : rep_rp.success) {
                    if (errors != null) {
                        const rp_id = (_a = rep_rp === null || rep_rp === void 0 ? void 0 : rep_rp.data) === null || _a === void 0 ? void 0 : _a.id;
                        const err_data = errors.map(({ code, description, shutdown_time, daily_report_id, }) => ({
                            code,
                            description,
                            shutdown_time,
                            daily_report_id: rp_id,
                        }));
                        const created_err = yield (0, codeError_useCase_1.create_err_for_report)(err_data);
                        if (created_err) {
                            return {
                                success: true,
                                data: created_err,
                            };
                        }
                        else {
                            return {
                                success: false,
                                message: 'created err of Report failed',
                            };
                        }
                    }
                    else {
                        return {
                            success: true,
                            message: 'created report',
                        };
                    }
                }
                else {
                    return {
                        success: false,
                        message: 'created report failed',
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: 'data Product not valid',
                };
            }
        }
        else {
            return {
                success: false,
                message: valid.error.message,
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
exports.create_daily_report = create_daily_report;
const find_all_rp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errs = yield (0, dailyReport_repository_1.find_report_all)();
        if (errs === null || errs === void 0 ? void 0 : errs.success) {
            return {
                success: true,
                data: errs === null || errs === void 0 ? void 0 : errs.data,
            };
        }
        else {
            return {
                success: false,
                message: errs === null || errs === void 0 ? void 0 : errs.message,
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error,
        };
    }
});
exports.find_all_rp = find_all_rp;
const find_rp_by_id = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = yield (0, validates_1.validation_id)(id);
        if (!(valid === null || valid === void 0 ? void 0 : valid.error)) {
            const report = yield (0, dailyReport_repository_1.find_daily_report_by_id)(id);
            console.log(report);
            if (report === null || report === void 0 ? void 0 : report.success) {
                return {
                    success: true,
                    data: report === null || report === void 0 ? void 0 : report.data,
                };
            }
            else {
                return {
                    success: false,
                    message: report === null || report === void 0 ? void 0 : report.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: valid === null || valid === void 0 ? void 0 : valid.error.message,
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
exports.find_rp_by_id = find_rp_by_id;
