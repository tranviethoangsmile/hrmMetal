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
const deleteDependentSupportAmountRouter = (0, express_1.Router)();
deleteDependentSupportAmountRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteValue = req.body;
        if (!deleteValue || !(deleteValue === null || deleteValue === void 0 ? void 0 : deleteValue.id) || !(deleteValue === null || deleteValue === void 0 ? void 0 : deleteValue.user_id)) {
            const missingFields = [
                !(deleteValue === null || deleteValue === void 0 ? void 0 : deleteValue.id) && 'id',
                !(deleteValue === null || deleteValue === void 0 ? void 0 : deleteValue.user_id) && 'user_id'
            ].filter(Boolean).join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        const result = yield (0, controllers_1.delete_dependent_support_amount_controller)(deleteValue);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            return (0, helpers_1.errorResponse)(res, 200, `${result === null || result === void 0 ? void 0 : result.message}`);
        }
        return (0, helpers_1.successResponse)(res, 202);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, `${error === null || error === void 0 ? void 0 : error.message}` || 'Internal server error');
    }
}));
exports.default = deleteDependentSupportAmountRouter;
