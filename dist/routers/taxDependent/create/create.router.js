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
const createTaxDependentRouter = (0, express_1.Router)();
createTaxDependentRouter.post('/', middlewares_1.create_media_path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createValue = req.body;
        // Check required fields
        if (!createValue ||
            !createValue.user_id ||
            !createValue.name ||
            !createValue.dob ||
            !createValue.gender ||
            !createValue.relationship) {
            const missingFields = [
                !createValue.user_id && 'user_id',
                !createValue.name && 'name',
                !createValue.dob && 'dob',
                !createValue.gender && 'gender',
                !createValue.relationship && 'relationship',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        // Call controller
        const result = yield (0, controllers_1.createTaxDependentController)(createValue);
        if (result === null || result === void 0 ? void 0 : result.success) {
            return (0, helpers_1.successResponse)(res, 201, result.data);
        }
        else {
            return (0, helpers_1.errorResponse)(res, 200, (result === null || result === void 0 ? void 0 : result.message) || 'Failed to create tax dependent');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createTaxDependentRouter;
