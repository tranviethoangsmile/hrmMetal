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
const createSafetyCheckRouter = (0, express_1.Router)();
createSafetyCheckRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field ||
            !field.event_id ||
            !field.is_at_home ||
            !field.is_can_work ||
            !field.user_id ||
            !field.is_safety) {
            const missingFields = [
                !field.event_id && 'event_id',
                !field.is_at_home && 'is_at_home',
                !field.is_can_work && 'is_can_work',
                !field.user_id && 'user_id',
                !field.is_safety && 'is_safety',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Bad request: Missing required ${missingFields}`);
        }
        const create_safety_check = yield (0, controllers_1.create_safety_check_controller)(field);
        if (!(create_safety_check === null || create_safety_check === void 0 ? void 0 : create_safety_check.success)) {
            return (0, helpers_1.errorResponse)(res, 200, (create_safety_check === null || create_safety_check === void 0 ? void 0 : create_safety_check.message) || 'Failed to create safety check');
        }
        return (0, helpers_1.successResponse)(res, 201, create_safety_check === null || create_safety_check === void 0 ? void 0 : create_safety_check.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createSafetyCheckRouter;
