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
const middlewares_1 = require("../../../middlewares");
const helpers_1 = require("../../../helpers");
const createSafetyReportRouter = (0, express_1.Router)();
createSafetyReportRouter.post('/', middlewares_1.create_media_path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field ||
            !field.user_id ||
            !field.title ||
            !field.content ||
            !field.date ||
            !field.department_id ||
            !field.solution) {
            const missingFields = [
                !field.user_id && 'user_id',
                !field.title && 'title',
                !field.content && 'content',
                !field.date && 'date',
                !field.department_id && 'department_id',
                !field.solution && 'solution',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Missing required ${missingFields}`);
        }
        const result = yield (0, controllers_1.create_safety_report_controller)(field);
        if (!result.success) {
            return (0, helpers_1.errorResponse)(res, 400, (result === null || result === void 0 ? void 0 : result.message) || 'Failed to create safety report');
        }
        return (0, helpers_1.successResponse)(res, 201, result === null || result === void 0 ? void 0 : result.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createSafetyReportRouter;
