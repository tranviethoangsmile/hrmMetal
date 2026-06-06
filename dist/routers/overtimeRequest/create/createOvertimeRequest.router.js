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
const createOvertimeRequestRouter = (0, express_1.Router)();
createOvertimeRequestRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (!data ||
            !data.user_id ||
            !data.department_id ||
            !data.leader_id ||
            !data.position ||
            !data.date ||
            !data.overtime_hours ||
            !data.description) {
            const missingFields = [
                !data.user_id && 'user_id',
                !data.date && 'date',
                !data.position && 'position',
                !data.department_id && 'department_id',
                !data.overtime_hours && 'overtime_hours',
                !data.description && 'description',
                !data.leader_id && 'leader_id',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Missing values: ${missingFields}`);
        }
        const result = yield (0, controllers_1.create_overtime_request_controller)(data);
        if (result === null || result === void 0 ? void 0 : result.success) {
            return (0, helpers_1.successResponse)(res, 201, result.data);
        }
        return (0, helpers_1.errorResponse)(res, 400, (result === null || result === void 0 ? void 0 : result.message) || 'Failed to create overtime request');
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createOvertimeRequestRouter;
