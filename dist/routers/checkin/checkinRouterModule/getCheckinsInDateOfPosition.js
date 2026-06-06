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
const getCheckinIndateOfPosition = (0, express_1.Router)();
getCheckinIndateOfPosition.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let field = req.body;
        if (!(field === null || field === void 0 ? void 0 : field.date) || !(field === null || field === void 0 ? void 0 : field.position)) {
            const missingFields = [
                !(field === null || field === void 0 ? void 0 : field.date) && 'date',
                !(field === null || field === void 0 ? void 0 : field.position) && 'position',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Missing required ${missingFields}`);
        }
        const checkins = yield (0, controllers_1.get_checkin_in_date_of_position_controller)(field);
        if (!(checkins === null || checkins === void 0 ? void 0 : checkins.success)) {
            return (0, helpers_1.errorResponse)(res, 200, checkins === null || checkins === void 0 ? void 0 : checkins.message);
        }
        return (0, helpers_1.successResponse)(res, 202, checkins === null || checkins === void 0 ? void 0 : checkins.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = getCheckinIndateOfPosition;
