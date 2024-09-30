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
const searchByDateOfDepartmentRouter = (0, express_1.Router)();
searchByDateOfDepartmentRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field ||
            !field.department_id ||
            !field.end_date ||
            !field.start_date) {
            return res.status(400).json({
                success: false,
                message: 'Missing field',
            });
        }
        const planProductions = yield (0, controllers_1.search_plan_production_seven_day_of_department_controller)(field);
        if (!(planProductions === null || planProductions === void 0 ? void 0 : planProductions.success)) {
            return res.status(200).json({
                success: false,
                message: planProductions === null || planProductions === void 0 ? void 0 : planProductions.message,
            });
        }
        return res.status(202).json({
            success: true,
            data: planProductions === null || planProductions === void 0 ? void 0 : planProductions.data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error.message}`,
        });
    }
}));
exports.default = searchByDateOfDepartmentRouter;
