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
const sequelize_1 = require("sequelize");
class PlanProductionRepository {
    create_plan_production_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plan_production = yield models_1.PlanProduction.create(Object.assign({}, field));
                if (plan_production == null) {
                    throw new Error('Error creating plan production');
                }
                return {
                    success: true,
                    data: plan_production,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    update_plan_production_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payroll = yield models_1.PlanProduction.update(Object.assign({}, field), {
                    where: {
                        id: field.id,
                    },
                });
                if (payroll[0] !== 1) {
                    throw new Error('Error updating payroll');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
    search_plan_production_by_id_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const planProduction = yield models_1.PlanProduction.findOne({
                    where: {
                        id: id,
                    },
                    attributes: [
                        'id',
                        'date',
                        'department_id',
                        'position',
                        'quantity',
                        'product',
                        'operation_time',
                        'work_shift',
                        'production_line',
                        'is_custom',
                    ],
                    include: [
                        {
                            model: models_1.Department,
                            attributes: ['id', 'name'],
                        },
                    ],
                });
                if (planProduction === null) {
                    throw new Error('payroll not found or not avaliable');
                }
                return {
                    success: true,
                    data: planProduction,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
    destroy_plan_production_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.PlanProduction.destroy({
                    where: {
                        id: id,
                    },
                });
                if (result !== 1) {
                    throw new Error('Error deleting payroll');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
    search_plan_production_seven_day_of_department_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payrolls = yield models_1.PlanProduction.findAll({
                    where: {
                        department_id: field.department_id,
                        date: {
                            [sequelize_1.Op.gte]: field.start_date,
                            [sequelize_1.Op.lte]: field.end_date,
                        },
                    },
                    attributes: [
                        'id',
                        'date',
                        'department_id',
                        'position',
                        'quantity',
                        'product',
                        'operation_time',
                        'work_shift',
                        'production_line',
                        'is_custom',
                    ],
                    include: [
                        {
                            model: models_1.Department,
                            attributes: ['id', 'name'],
                        },
                    ],
                });
                return {
                    success: true,
                    data: payrolls,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo: ${error.message}`,
                };
            }
        });
    }
}
exports.default = PlanProductionRepository;
