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
const express_1 = require("express");
const controllers_1 = require("../../../controllers");
const helpers_1 = require("../../../helpers");
const createPlanProductionRouter = (0, express_1.Router)();
createPlanProductionRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field ||
            !field.date.trim() ||
            !field.department_id.trim() ||
            field.operation_time === undefined ||
            !field.position.trim() ||
            !field.product.trim() ||
            field.quantity < 0 ||
            field.operation_time < 0 ||
            !field.work_shift.trim() ||
            !field.production_line.trim()) {
            const missingFields = [
                !field.date.trim() && 'date',
                !field.department_id.trim() && 'department_id',
                field.operation_time === undefined && 'operation_time',
                !field.position.trim() && 'position',
                !field.product.trim() && 'product',
                field.quantity < 0 && 'quantity',
                field.operation_time < 0 && 'operation_time',
                !field.work_shift.trim() && 'work_shift',
                !field.production_line.trim() && 'production_line',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Missing required ${missingFields}`);
        }
        const plan_production = yield (0, controllers_1.create_plan_production_controller)(Object.assign({}, field));
        if (!(plan_production === null || plan_production === void 0 ? void 0 : plan_production.success)) {
            return (0, helpers_1.errorResponse)(res, 400, (plan_production === null || plan_production === void 0 ? void 0 : plan_production.message) || 'Failed to create plan production');
        }
        return (0, helpers_1.successResponse)(res, 201, plan_production === null || plan_production === void 0 ? void 0 : plan_production.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createPlanProductionRouter;
