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
exports.getEnumForAdminUsecase = void 0;
const helpers_1 = require("../../../helpers");
const enum_1 = require("../../../enum");
const numericEnumToArray = (enumObj) => Object.values(enumObj).filter(v => typeof v === 'number');
const getEnumForAdminUsecase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            roles: (0, helpers_1.enumToArray)(enum_1.Role),
            positions: (0, helpers_1.enumToArray)(enum_1.Position),
            products: (0, helpers_1.enumToArray)(enum_1.Products),
            work_shifts: (0, helpers_1.enumToArray)(enum_1.shift_work),
            shifts: (0, helpers_1.enumToArray)(enum_1.shift),
            notification_types: (0, helpers_1.enumToArray)(enum_1.notification_type),
            uniform_types: (0, helpers_1.enumToArray)(enum_1.UniformType),
            uniform_sizes: (0, helpers_1.enumToArray)(enum_1.UniformSize),
            tax_dependent_statuses: (0, helpers_1.enumToArray)(enum_1.TaxDependentStatusEnum),
            overtime_request_hours: numericEnumToArray(enum_1.OVERTIME_REQUEST_HOUR),
            tax_dependent_relationship_enum: (0, helpers_1.enumToArray)(enum_1.TaxDependentRelationshipEnum),
            tax_dependent_gender_enum: (0, helpers_1.enumToArray)(enum_1.TaxDependentGenderEnum),
        };
        return {
            success: true,
            data: data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `error from usecase :: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.getEnumForAdminUsecase = getEnumForAdminUsecase;
