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
const getDepByIdRouter = (0, express_1.Router)();
getDepByIdRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!id) {
            return (0, helpers_1.errorResponse)(res, 400, 'id is required');
        }
        const department = yield (0, controllers_1.getDepartmentById)(id);
        if (department === null || department === void 0 ? void 0 : department.success) {
            return (0, helpers_1.successResponse)(res, 200, department === null || department === void 0 ? void 0 : department.data);
        }
        else {
            return (0, helpers_1.errorResponse)(res, 404, (department === null || department === void 0 ? void 0 : department.message) || 'Department not found');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = getDepByIdRouter;
