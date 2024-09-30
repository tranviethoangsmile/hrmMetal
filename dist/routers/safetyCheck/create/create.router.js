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
const safetyCheck_controller_1 = require("../../../controllers/safetyCheck/safetyCheck.controller");
const createSafetyCheckRouter = (0, express_1.Router)();
createSafetyCheckRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        console.log(field);
        if (!field ||
            !field.event_id ||
            !field.is_at_home ||
            !field.is_can_work ||
            !field.user_id ||
            !field.is_safety) {
            return res
                .status(400)
                .json({ success: false, message: 'Bad request' });
        }
        const create_safety_check = yield (0, safetyCheck_controller_1.create_safety_check_controller)(field);
        if (!(create_safety_check === null || create_safety_check === void 0 ? void 0 : create_safety_check.success)) {
            throw new Error(create_safety_check === null || create_safety_check === void 0 ? void 0 : create_safety_check.message);
        }
        return res.status(201).json({
            success: true,
            data: create_safety_check === null || create_safety_check === void 0 ? void 0 : create_safety_check.data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server: ${error === null || error === void 0 ? void 0 : error.message}`,
        });
    }
}));
exports.default = createSafetyCheckRouter;
