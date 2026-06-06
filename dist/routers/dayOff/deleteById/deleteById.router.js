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
const dayOff_controller_1 = require("../../../controllers/dayOff/dayOff.controller");
const helpers_1 = require("../../../helpers");
const deleteByIdRouter = (0, express_1.Router)();
deleteByIdRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!id || typeof id !== 'string' || id.trim() === '') {
            return (0, helpers_1.errorResponse)(res, 400, 'ID is required and must be a non-empty string');
        }
        const isDeleted = yield (0, dayOff_controller_1.delete_day_off_by_id_controller)(id);
        if (!(isDeleted === null || isDeleted === void 0 ? void 0 : isDeleted.success)) {
            return (0, helpers_1.errorResponse)(res, 404, `Day off with ID ${id} not found`);
        }
        return (0, helpers_1.successResponse)(res, 200, undefined, 'Day off deleted successfully');
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = deleteByIdRouter;
