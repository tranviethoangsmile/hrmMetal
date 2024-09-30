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
exports.search_plan_production_seven_day_of_department_use = exports.destroy_plan_production_use = exports.search_plan_production_by_id_use = exports.update_plan_production_use = exports.create_plan_production_use = void 0;
const department_useCase_1 = require("../department/department.useCase");
const validates_1 = require("../../validates");
const enum_1 = require("../../enum");
const repositorys_1 = require("../../repositorys");
const planProductionRepository = new repositorys_1.PlanProductionRepository();
const handleProductName = (value) => {
    switch (value) {
        case 'D042F_PAO_DC4':
        case 'D042F_PAO_DC3':
            return 'D042F';
        case 'D93F_PAO_DC4':
        case 'D93F_PAO_DC3':
        case 'D93F_PAO_DC2':
            return 'D93F';
        case 'D860F_PAO_DC3':
            return 'D860F';
        case 'D61F_PAO_DC4':
        case 'D61F_PAO_DC2':
            return 'D61F';
        case 'D66_5':
        case 'D66_6':
        case 'D66_DC3':
            return 'D66F';
        case 'DF93_4':
        case 'DF93_3':
            return 'DF93CTC';
        case 'DK05FR_1':
        case 'DK05FR_2':
            return 'DK05FR';
        case 'DK05RR_2':
        case 'DK05RR_1':
            return 'DK05RR';
        default:
            return value;
    }
};
const create_plan_production_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_create_plan_production)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        if (!Object.values(enum_1.Products).includes(field.product)) {
            throw new Error('Product is not valid');
        }
        if (!Object.values(enum_1.shift_work).includes(field.work_shift)) {
            throw new Error('Work shift is not valid');
        }
        if (!Object.values(enum_1.Position).includes(field.position)) {
            throw new Error('Position is not valid');
        }
        const department = yield (0, department_useCase_1.getDepById)(field.department_id);
        if (!(department === null || department === void 0 ? void 0 : department.success)) {
            throw new Error(`${department === null || department === void 0 ? void 0 : department.message}`);
        }
        field.product = handleProductName(field.product);
        const planProduction = yield planProductionRepository.create_plan_production_repo(Object.assign({}, field));
        if (!(planProduction === null || planProduction === void 0 ? void 0 : planProduction.success)) {
            throw new Error(`${planProduction === null || planProduction === void 0 ? void 0 : planProduction.message}`);
        }
        return {
            success: true,
            data: planProduction,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.create_plan_production_use = create_plan_production_use;
const search_plan_production_by_id_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const planProduction = yield planProductionRepository.search_plan_production_by_id_repo(id);
        if (!(planProduction === null || planProduction === void 0 ? void 0 : planProduction.success)) {
            throw new Error(`${planProduction === null || planProduction === void 0 ? void 0 : planProduction.message}`);
        }
        return {
            success: true,
            data: planProduction === null || planProduction === void 0 ? void 0 : planProduction.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.search_plan_production_by_id_use = search_plan_production_by_id_use;
const update_plan_production_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_update_plan_production)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const plan_production = yield search_plan_production_by_id_use(field.id);
        if (!(plan_production === null || plan_production === void 0 ? void 0 : plan_production.success)) {
            throw new Error(`${plan_production === null || plan_production === void 0 ? void 0 : plan_production.message}`);
        }
        if (field.product) {
            field.product = handleProductName(field.product);
        }
        if (field.position) {
            if (!Object.values(enum_1.Position).includes(field.position)) {
                throw new Error('Position is not valid');
            }
        }
        if (field.work_shift) {
            if (!Object.values(enum_1.shift_work).includes(field.work_shift)) {
                throw new Error('Work shift is not valid');
            }
        }
        const planProduction = yield planProductionRepository.update_plan_production_repo(Object.assign({}, field));
        if (!(planProduction === null || planProduction === void 0 ? void 0 : planProduction.success)) {
            throw new Error(`${planProduction === null || planProduction === void 0 ? void 0 : planProduction.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.update_plan_production_use = update_plan_production_use;
const destroy_plan_production_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const planProduction = yield planProductionRepository.search_plan_production_by_id_repo(id);
        if (!(planProduction === null || planProduction === void 0 ? void 0 : planProduction.success)) {
            throw new Error(`${planProduction === null || planProduction === void 0 ? void 0 : planProduction.message}`);
        }
        const result = yield planProductionRepository.destroy_plan_production_repo(id);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(`${result === null || result === void 0 ? void 0 : result.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.destroy_plan_production_use = destroy_plan_production_use;
const search_plan_production_seven_day_of_department_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_search_plan_production_seven_day_of_department)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const planProduction = yield planProductionRepository.search_plan_production_seven_day_of_department_repo(Object.assign({}, field));
        if (!(planProduction === null || planProduction === void 0 ? void 0 : planProduction.success)) {
            throw new Error(`${planProduction === null || planProduction === void 0 ? void 0 : planProduction.message}`);
        }
        return {
            success: true,
            data: planProduction === null || planProduction === void 0 ? void 0 : planProduction.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.search_plan_production_seven_day_of_department_use = search_plan_production_seven_day_of_department_use;
