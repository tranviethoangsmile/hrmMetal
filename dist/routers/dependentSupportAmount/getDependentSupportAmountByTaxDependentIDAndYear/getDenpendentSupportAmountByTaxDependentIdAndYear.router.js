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
const getDependentSupportAmountByTaxDependentIdAndYearRouter = (0, express_1.Router)();
getDependentSupportAmountByTaxDependentIdAndYearRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        if (!(fields === null || fields === void 0 ? void 0 : fields.tax_dependent_id) || !(fields === null || fields === void 0 ? void 0 : fields.year)) {
            const missingFields = [
                !(fields === null || fields === void 0 ? void 0 : fields.tax_dependent_id) && 'tax_dependent_id',
                !(fields === null || fields === void 0 ? void 0 : fields.year) && 'year'
            ].filter(Boolean).join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        const result = yield (0, controllers_1.get_dependent_support_amount_by_tax_dependent_id_and_year_controller)(fields);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            return (0, helpers_1.errorResponse)(res, 200, (result === null || result === void 0 ? void 0 : result.message) || 'Failed to get dependent support amount');
        }
        return (0, helpers_1.successResponse)(res, 202, result === null || result === void 0 ? void 0 : result.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = getDependentSupportAmountByTaxDependentIdAndYearRouter;
