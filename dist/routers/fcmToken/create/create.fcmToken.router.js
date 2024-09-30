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
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`,
            });
        }
        const fcm = yield (0, controllers_1.create_fcm_token_controller)(field);
        if (!(fcm === null || fcm === void 0 ? void 0 : fcm.success)) {
            return res.status(200).json({
                success: false,
                message: `${fcm === null || fcm === void 0 ? void 0 : fcm.message}`,
            });
        }
        return res.status(201).json({
            success: true,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `Internal server error`,
        });
    }
}));
exports.default = createFcm;
