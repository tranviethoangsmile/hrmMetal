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
const createDayOffRouter = (0, express_1.Router)();
createDayOffRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field || !(field === null || field === void 0 ? void 0 : field.date) || !(field === null || field === void 0 ? void 0 : field.user_id)) {
            return (0, helpers_1.errorResponse)(res, 400, 'Invalid input: date and user_id are required');
        }
        const day_off = yield (0, controllers_1.create_day_off_controller)(field);
        if (!(day_off === null || day_off === void 0 ? void 0 : day_off.success)) {
            return (0, helpers_1.errorResponse)(res, 400, (day_off === null || day_off === void 0 ? void 0 : day_off.message) || 'Failed to create day off');
        }
        return (0, helpers_1.successResponse)(res, 201, day_off === null || day_off === void 0 ? void 0 : day_off.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createDayOffRouter;
