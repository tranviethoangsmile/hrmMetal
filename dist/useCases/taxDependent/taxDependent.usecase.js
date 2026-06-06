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
exports.getTaxDependentByIdUsecase = exports.updateTaxDependentStatusWithIdUseCase = exports.getTaxDependentByUserIdUseCase = exports.updateTaxDependentWithIdUseCase = exports.deleteTaxDependentWithIdUseCase = exports.createTaxDependentUseCase = void 0;
const repositorys_1 = require("../../repositorys");
const enum_1 = require("../../enum");
const validates_1 = require("../../validates");
const index_1 = require("../index");
const helpers_1 = require("../../helpers");
const taxDependentRepository = new repositorys_1.TaxDependentRepository();
const createTaxDependentUseCase = (createValue) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate input với Joi
        const valid = (0, validates_1.validate_create_tax_dependent)(createValue);
        if (valid === null || valid === void 0 ? void 0 : valid.error) {
            throw new Error(`${valid.error.message}`);
        }
        // Validate enum values
        if (!(0, helpers_1.isValidEnumValue)(createValue.gender, enum_1.TaxDependentGenderEnum)) {
            throw new Error(`Gender is not valid`);
        }
        if (!(0, helpers_1.isValidEnumValue)(createValue.relationship, enum_1.TaxDependentRelationshipEnum)) {
            throw new Error(`Relationship is not valid`);
        }
        if (createValue.status &&
            !(0, helpers_1.isValidEnumValue)(createValue.status, enum_1.TaxDependentStatusEnum)) {
            throw new Error(`Status is not valid`);
        }
        // Check user exists
        const user = yield (0, index_1.findUserById)(createValue.user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        // Create tax dependent
        const taxDependent = yield taxDependentRepository.CREATE(createValue);
        if (!(taxDependent === null || taxDependent === void 0 ? void 0 : taxDependent.success)) {
            throw new Error(`${taxDependent === null || taxDependent === void 0 ? void 0 : taxDependent.message}`);
        }
        return {
            success: true,
            data: taxDependent === null || taxDependent === void 0 ? void 0 : taxDependent.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error',
        };
    }
});
exports.createTaxDependentUseCase = createTaxDependentUseCase;
const deleteTaxDependentWithIdUseCase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`Validation Error: ${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const deleteResult = yield taxDependentRepository.DELETE(id);
        if (!(deleteResult === null || deleteResult === void 0 ? void 0 : deleteResult.success)) {
            throw new Error(`${deleteResult === null || deleteResult === void 0 ? void 0 : deleteResult.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error',
        };
    }
});
exports.deleteTaxDependentWithIdUseCase = deleteTaxDependentWithIdUseCase;
const updateTaxDependentWithIdUseCase = (updateValue) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const valid = (0, validates_1.validate_update_tax_dependent)(updateValue);
        if (valid === null || valid === void 0 ? void 0 : valid.error) {
            throw new Error(`${valid.error.message}`);
        }
        const taxDependent = yield taxDependentRepository.GET_BY_ID(updateValue.id);
        if (!(taxDependent === null || taxDependent === void 0 ? void 0 : taxDependent.success)) {
            throw new Error(`${taxDependent === null || taxDependent === void 0 ? void 0 : taxDependent.message}`);
        }
        if (((_a = taxDependent === null || taxDependent === void 0 ? void 0 : taxDependent.data) === null || _a === void 0 ? void 0 : _a.user_id) !== updateValue.user_id) {
            throw new Error(`You are not authorized to update this tax dependent`);
        }
        const updateResult = yield taxDependentRepository.UPDATE(updateValue);
        if (!(updateResult === null || updateResult === void 0 ? void 0 : updateResult.success)) {
            throw new Error(`${updateResult === null || updateResult === void 0 ? void 0 : updateResult.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error',
        };
    }
});
exports.updateTaxDependentWithIdUseCase = updateTaxDependentWithIdUseCase;
const updateTaxDependentStatusWithIdUseCase = (updateStatusValue) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(updateStatusValue === null || updateStatusValue === void 0 ? void 0 : updateStatusValue.id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`Validation Error: ${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        if (!(0, helpers_1.isValidEnumValue)(updateStatusValue === null || updateStatusValue === void 0 ? void 0 : updateStatusValue.status, enum_1.TaxDependentStatusEnum)) {
            throw new Error(`Status is not valid`);
        }
        const taxDependent = yield taxDependentRepository.GET_BY_ID(updateStatusValue === null || updateStatusValue === void 0 ? void 0 : updateStatusValue.id);
        if (!(taxDependent === null || taxDependent === void 0 ? void 0 : taxDependent.success)) {
            throw new Error(`${taxDependent === null || taxDependent === void 0 ? void 0 : taxDependent.message}`);
        }
        const updateResult = yield taxDependentRepository.UPDATE_STATUS(updateStatusValue);
        if (!(updateResult === null || updateResult === void 0 ? void 0 : updateResult.success)) {
            throw new Error(`${updateResult === null || updateResult === void 0 ? void 0 : updateResult.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error',
        };
    }
});
exports.updateTaxDependentStatusWithIdUseCase = updateTaxDependentStatusWithIdUseCase;
const getTaxDependentByUserIdUseCase = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(user_id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`Validation Error: ${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const user = yield (0, index_1.findUserById)(user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        const taxDependents = yield taxDependentRepository.GET_ALL_BY_USER_ID(user_id);
        if (!(taxDependents === null || taxDependents === void 0 ? void 0 : taxDependents.success)) {
            throw new Error(`${taxDependents === null || taxDependents === void 0 ? void 0 : taxDependents.message}`);
        }
        return {
            success: true,
            data: taxDependents === null || taxDependents === void 0 ? void 0 : taxDependents.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error',
        };
    }
});
exports.getTaxDependentByUserIdUseCase = getTaxDependentByUserIdUseCase;
const getTaxDependentByIdUsecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const taxDependent = yield taxDependentRepository.GET_TAX_DEPENDENT_BY_ID(id);
        if (!(taxDependent === null || taxDependent === void 0 ? void 0 : taxDependent.success)) {
            throw new Error(`${taxDependent === null || taxDependent === void 0 ? void 0 : taxDependent.message}`);
        }
        return {
            success: true,
            data: taxDependent === null || taxDependent === void 0 ? void 0 : taxDependent.data
        };
    }
    catch (error) {
        return {
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error',
        };
    }
});
exports.getTaxDependentByIdUsecase = getTaxDependentByIdUsecase;
