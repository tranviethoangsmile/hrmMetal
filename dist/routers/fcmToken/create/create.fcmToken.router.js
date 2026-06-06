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
const createFcm = (0, express_1.Router)();
createFcm.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        const missingFields = [];
        if (!(field === null || field === void 0 ? void 0 : field.app_version))
            missingFields.push('app_version');
        if (!(field === null || field === void 0 ? void 0 : field.device_id))
            missingFields.push('device_id');
        if (!(field === null || field === void 0 ? void 0 : field.device_type))
            missingFields.push('device_type');
        if (!(field === null || field === void 0 ? void 0 : field.fcm_token))
            missingFields.push('fcm_token');
        if (!(field === null || field === void 0 ? void 0 : field.user_id))
            missingFields.push('user_id');
        if (missingFields.length > 0) {
            return (0, helpers_1.errorResponse)(res, 400, `Missing required fields: ${missingFields.join(', ')}`);
        }
        const fcm = yield (0, controllers_1.create_fcm_token_controller)(field);
        if (!(fcm === null || fcm === void 0 ? void 0 : fcm.success)) {
            return (0, helpers_1.errorResponse)(res, 400, (fcm === null || fcm === void 0 ? void 0 : fcm.message) || 'Failed to create FCM token');
        }
        return (0, helpers_1.successResponse)(res, 201);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createFcm;
