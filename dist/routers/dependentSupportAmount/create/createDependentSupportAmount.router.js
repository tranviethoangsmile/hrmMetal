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
const middlewares_1 = require("../../../middlewares");
const createDependentSupportAmountRouter = (0, express_1.Router)();
createDependentSupportAmountRouter.post('/', middlewares_1.create_media_path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createDependenSupportAmount = req.body;
        if (!createDependenSupportAmount || !(createDependenSupportAmount === null || createDependenSupportAmount === void 0 ? void 0 : createDependenSupportAmount.tax_dependent_id) || !(createDependenSupportAmount === null || createDependenSupportAmount === void 0 ? void 0 : createDependenSupportAmount.year) || !(createDependenSupportAmount === null || createDependenSupportAmount === void 0 ? void 0 : createDependenSupportAmount.user_id)) {
            const missingFields = [
                !(createDependenSupportAmount === null || createDependenSupportAmount === void 0 ? void 0 : createDependenSupportAmount.tax_dependent_id) && 'tax_dependent_id',
                !(createDependenSupportAmount === null || createDependenSupportAmount === void 0 ? void 0 : createDependenSupportAmount.user_id) && "user_id",
                !(createDependenSupportAmount === null || createDependenSupportAmount === void 0 ? void 0 : createDependenSupportAmount.year) && 'year'
            ].filter(Boolean).join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        const dependentSupportAmount = yield (0, controllers_1.create_dependent_support_amount_controller)(createDependenSupportAmount);
        if (!(dependentSupportAmount === null || dependentSupportAmount === void 0 ? void 0 : dependentSupportAmount.success)) {
            return (0, helpers_1.errorResponse)(res, 200, `${dependentSupportAmount === null || dependentSupportAmount === void 0 ? void 0 : dependentSupportAmount.message}`);
        }
        return (0, helpers_1.successResponse)(res, 201, dependentSupportAmount === null || dependentSupportAmount === void 0 ? void 0 : dependentSupportAmount.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createDependentSupportAmountRouter;
