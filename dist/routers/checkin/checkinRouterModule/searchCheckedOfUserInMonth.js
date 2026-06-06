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
const checkinSearchRouter = (0, express_1.Router)();
checkinSearchRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!(field === null || field === void 0 ? void 0 : field.user_id) || !(field === null || field === void 0 ? void 0 : field.date)) {
            const missingFields = [
                !(field === null || field === void 0 ? void 0 : field.user_id) && 'user_id',
                !(field === null || field === void 0 ? void 0 : field.date) && 'date',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Missing required ${missingFields}`);
        }
        const checked_value = yield (0, controllers_1.search_checked_of_user_in_month_controller)(field);
        if (!(checked_value === null || checked_value === void 0 ? void 0 : checked_value.success)) {
            return (0, helpers_1.successResponse)(res, 200, checked_value === null || checked_value === void 0 ? void 0 : checked_value.data);
        }
        return (0, helpers_1.successResponse)(res, 202, checked_value === null || checked_value === void 0 ? void 0 : checked_value.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = checkinSearchRouter;
