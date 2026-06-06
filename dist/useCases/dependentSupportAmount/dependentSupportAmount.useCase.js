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
exports.get_dependent_support_amount_by_tax_dependent_id_and_year_usecase = exports.get_dependent_support_amount_usecase = exports.delete_dependent_support_amount_usecase = exports.update_confirm_dependent_support_amount_usecase = exports.update_dependent_support_amount_usecase = exports.create_dependent_support_amount_usecase = void 0;
const repositorys_1 = require("../../repositorys");
const models_1 = require("../../models");
const validates_1 = require("../../validates");
const useCases_1 = require("../../useCases");
const dependentSupportAmount = new repositorys_1.DependentSupportAmountRepo();
const create_dependent_support_amount_usecase = (createDependentSupportAmountValue) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_create_dependent_support_amount)(createDependentSupportAmountValue);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const taxDependent = yield (0, useCases_1.getTaxDependentByIdUsecase)(createDependentSupportAmountValue === null || createDependentSupportAmountValue === void 0 ? void 0 : createDependentSupportAmountValue.tax_dependent_id);
        if (!(taxDependent === null || taxDependent === void 0 ? void 0 : taxDependent.success)) {
            return {
                success: false,
                message: `${taxDependent === null || taxDependent === void 0 ? void 0 : taxDependent.message}`
            };
        }
        const user = yield (0, useCases_1.getUserByIdUseCase)(createDependentSupportAmountValue === null || createDependentSupportAmountValue === void 0 ? void 0 : createDependentSupportAmountValue.user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        // Check for duplicate tax_dependent_id + year
        const existingRecord = yield models_1.DependentSupportAmount.findOne({
            where: {
                tax_dependent_id: createDependentSupportAmountValue === null || createDependentSupportAmountValue === void 0 ? void 0 : createDependentSupportAmountValue.tax_dependent_id,
                year: createDependentSupportAmountValue === null || createDependentSupportAmountValue === void 0 ? void 0 : createDependentSupportAmountValue.year
            }
        });
        if (existingRecord) {
            throw new Error(`Support amount record for this tax dependent and year already exists`);
        }
        const dependentSupportAmountResult = yield dependentSupportAmount.CREATE(createDependentSupportAmountValue);
        if (!(dependentSupportAmountResult === null || dependentSupportAmountResult === void 0 ? void 0 : dependentSupportAmountResult.success)) {
            return {
                success: false,
                message: dependentSupportAmountResult === null || dependentSupportAmountResult === void 0 ? void 0 : dependentSupportAmountResult.message
            };
        }
        return {
            success: true,
            data: dependentSupportAmountResult === null || dependentSupportAmountResult === void 0 ? void 0 : dependentSupportAmountResult.data
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error === null || error === void 0 ? void 0 : error.message}`
        };
    }
});
exports.create_dependent_support_amount_usecase = create_dependent_support_amount_usecase;
const update_dependent_support_amount_usecase = (updateDependentSupportAmountValue) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const isValid = (0, validates_1.validate_update_dependent_support_amount)(updateDependentSupportAmountValue);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const dependentSpAmount = yield dependentSupportAmount.GET_DEPENDENT_SUPPORT_AMOUNT_BY_ID(updateDependentSupportAmountValue === null || updateDependentSupportAmountValue === void 0 ? void 0 : updateDependentSupportAmountValue.id);
        if (((_a = dependentSpAmount === null || dependentSpAmount === void 0 ? void 0 : dependentSpAmount.data) === null || _a === void 0 ? void 0 : _a.user_id) !== (updateDependentSupportAmountValue === null || updateDependentSupportAmountValue === void 0 ? void 0 : updateDependentSupportAmountValue.user_id)) {
            throw new Error(`You are not authorized to update this dependent support amount`);
        }
        const dependentSupportAmountResult = yield dependentSupportAmount.UPDATE(updateDependentSupportAmountValue);
        if (!(dependentSupportAmountResult === null || dependentSupportAmountResult === void 0 ? void 0 : dependentSupportAmountResult.success)) {
            return {
                success: false,
                message: dependentSupportAmountResult === null || dependentSupportAmountResult === void 0 ? void 0 : dependentSupportAmountResult.message
            };
        }
        return {
            success: true
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error === null || error === void 0 ? void 0 : error.message}`
        };
    }
});
exports.update_dependent_support_amount_usecase = update_dependent_support_amount_usecase;
const update_confirm_dependent_support_amount_usecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const result = yield dependentSupportAmount.UPDATE_CONFIRM_BY_ADMIN(id);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(`${result === null || result === void 0 ? void 0 : result.message}`);
        }
        return {
            success: true
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error === null || error === void 0 ? void 0 : error.message}`
        };
    }
});
exports.update_confirm_dependent_support_amount_usecase = update_confirm_dependent_support_amount_usecase;
const delete_dependent_support_amount_usecase = (deleteValue) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const isValid = (0, validates_1.validate_delete_dependent_support_amount)(deleteValue);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        // Check authorization - user can only delete their own records
        const dependentSpAmount = yield dependentSupportAmount.GET_DEPENDENT_SUPPORT_AMOUNT_BY_ID(deleteValue === null || deleteValue === void 0 ? void 0 : deleteValue.id);
        if (!(dependentSpAmount === null || dependentSpAmount === void 0 ? void 0 : dependentSpAmount.success)) {
            throw new Error(`Dependent support amount not found`);
        }
        if (((_b = dependentSpAmount === null || dependentSpAmount === void 0 ? void 0 : dependentSpAmount.data) === null || _b === void 0 ? void 0 : _b.user_id) !== (deleteValue === null || deleteValue === void 0 ? void 0 : deleteValue.user_id)) {
            throw new Error(`You are not authorized to delete this dependent support amount`);
        }
        const result = yield dependentSupportAmount.DELETE(deleteValue === null || deleteValue === void 0 ? void 0 : deleteValue.id, deleteValue === null || deleteValue === void 0 ? void 0 : deleteValue.user_id);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(`${result === null || result === void 0 ? void 0 : result.message}`);
        }
        return {
            success: true
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error === null || error === void 0 ? void 0 : error.message}`
        };
    }
});
exports.delete_dependent_support_amount_usecase = delete_dependent_support_amount_usecase;
const get_dependent_support_amount_usecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const result = yield dependentSupportAmount.GET_DEPENDENT_SUPPORT_AMOUNT_BY_ID(id);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(`${result === null || result === void 0 ? void 0 : result.message}`);
        }
        return {
            success: true,
            data: result === null || result === void 0 ? void 0 : result.data
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error === null || error === void 0 ? void 0 : error.message}`
        };
    }
});
exports.get_dependent_support_amount_usecase = get_dependent_support_amount_usecase;
const get_dependent_support_amount_by_tax_dependent_id_and_year_usecase = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_get_dependent_support_amount_by_tax_dependent_id_and_year)(fields);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const result = yield dependentSupportAmount.GET_DEPENDENT_SUPPORT_AMOUNT_BY_TAX_DEPENDENT_ID_AND_YEAR(fields);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(`${result === null || result === void 0 ? void 0 : result.message}`);
        }
        return {
            success: true,
            data: result === null || result === void 0 ? void 0 : result.data
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error === null || error === void 0 ? void 0 : error.message}`
        };
    }
});
exports.get_dependent_support_amount_by_tax_dependent_id_and_year_usecase = get_dependent_support_amount_by_tax_dependent_id_and_year_usecase;
