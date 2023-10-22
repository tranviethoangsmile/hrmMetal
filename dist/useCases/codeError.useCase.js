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
exports.find_error_of_report = exports.create_err_for_report = void 0;
const codeError_repository_1 = require("../repositorys/codeError.repository");
const CodeError_enum_1 = require("../enum/CodeError.enum");
const codeError_validate_1 = require("../validates/codeError.validate");
const dailyReport_useCase_1 = require("../useCases/dailyReport.useCase");
const create_err_for_report = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errs = data;
        var check = false;
        var rp_id;
        for (let i = 0; i < errs.length; i++) {
            if (typeof errs[i].code === 'string' &&
                Object.values(CodeError_enum_1.CodeError).includes(errs[i].code)) {
                rp_id = errs[i].daily_report_id;
                const report = yield (0, dailyReport_useCase_1.find_rp_by_id)(rp_id);
                if (report === null || report === void 0 ? void 0 : report.success) {
                    check = true;
                }
                else {
                    check = false;
                }
            }
            else {
                check = false;
            }
        }
        if (check) {
            const resp_errs = yield (0, codeError_repository_1.create_code_err)(errs);
            if (resp_errs === null || resp_errs === void 0 ? void 0 : resp_errs.success) {
                return {
                    success: true,
                    data: resp_errs === null || resp_errs === void 0 ? void 0 : resp_errs.data,
                };
            }
            else {
                return {
                    success: false,
                    message: resp_errs === null || resp_errs === void 0 ? void 0 : resp_errs.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'Code error not valid',
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
exports.create_err_for_report = create_err_for_report;
const find_error_of_report = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = yield (0, codeError_validate_1.valid_search_err)(data);
        if (!(valid === null || valid === void 0 ? void 0 : valid.error)) {
            const errs = yield (0, codeError_repository_1.find_err_of_report)(data);
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
exports.find_error_of_report = find_error_of_report;
