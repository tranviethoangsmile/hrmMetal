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
exports.destroy_payroll_usecase = exports.search_payroll_by_id_usecase = exports.search_payroll_of_user_in_month_use = exports.update_payroll_usecase = exports.create_payroll_usecase = void 0;
const payroll_validate_1 = require("../../validates/payroll/payroll.validate");
const validates_1 = require("../../validates");
const user_useCase_1 = require("../user/user.useCase");
const repositorys_1 = require("../../repositorys");
const payrollRepository = new repositorys_1.PayrollRepository();
const create_payroll_usecase = (field) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const isValid = (0, payroll_validate_1.validate_create_payroll)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${(_a = isValid === null || isValid === void 0 ? void 0 : isValid.error) === null || _a === void 0 ? void 0 : _a.message}`);
        }
        const user = yield (0, user_useCase_1.findUserById)(field === null || field === void 0 ? void 0 : field.user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        const result = yield payrollRepository.create_payroll_repo(Object.assign({}, field));
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(result === null || result === void 0 ? void 0 : result.message);
        }
        return {
            success: true,
            data: result === null || result === void 0 ? void 0 : result.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.create_payroll_usecase = create_payroll_usecase;
const update_payroll_usecase = (field) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const isValid = (0, payroll_validate_1.validate_update_payroll)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${(_b = isValid === null || isValid === void 0 ? void 0 : isValid.error) === null || _b === void 0 ? void 0 : _b.message}`);
        }
        const payroll = yield payrollRepository.search_payroll_by_id_repo(field === null || field === void 0 ? void 0 : field.id);
        if (!(payroll === null || payroll === void 0 ? void 0 : payroll.success)) {
            throw new Error(payroll === null || payroll === void 0 ? void 0 : payroll.message);
        }
        const result = yield payrollRepository.update_payroll_repo(Object.assign({}, field));
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(result === null || result === void 0 ? void 0 : result.message);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.update_payroll_usecase = update_payroll_usecase;
const search_payroll_of_user_in_month_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, payroll_validate_1.validate_search_payroll)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(isValid === null || isValid === void 0 ? void 0 : isValid.error.message);
        }
        const payroll = yield payrollRepository.search_payroll_of_user_in_month_repo(field);
        if (!(payroll === null || payroll === void 0 ? void 0 : payroll.success)) {
            throw new Error(payroll === null || payroll === void 0 ? void 0 : payroll.message);
        }
        return {
            success: true,
            data: payroll === null || payroll === void 0 ? void 0 : payroll.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.search_payroll_of_user_in_month_use = search_payroll_of_user_in_month_use;
const search_payroll_by_id_usecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(isValid === null || isValid === void 0 ? void 0 : isValid.error.message);
        }
        const payroll = yield payrollRepository.search_payroll_by_id_repo(id);
        if (!(payroll === null || payroll === void 0 ? void 0 : payroll.success)) {
            throw new Error(payroll === null || payroll === void 0 ? void 0 : payroll.message);
        }
        return {
            success: true,
            data: payroll === null || payroll === void 0 ? void 0 : payroll.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.search_payroll_by_id_usecase = search_payroll_by_id_usecase;
const destroy_payroll_usecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(isValid === null || isValid === void 0 ? void 0 : isValid.error.message);
        }
        const payroll = yield payrollRepository.search_payroll_by_id_repo(id);
        if (!(payroll === null || payroll === void 0 ? void 0 : payroll.success)) {
            throw new Error(payroll === null || payroll === void 0 ? void 0 : payroll.message);
        }
        const payroll_destroy = yield payrollRepository.destroy_payroll_repo(id);
        if (!(payroll_destroy === null || payroll_destroy === void 0 ? void 0 : payroll_destroy.success)) {
            throw new Error(payroll_destroy === null || payroll_destroy === void 0 ? void 0 : payroll_destroy.message);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.destroy_payroll_usecase = destroy_payroll_usecase;
