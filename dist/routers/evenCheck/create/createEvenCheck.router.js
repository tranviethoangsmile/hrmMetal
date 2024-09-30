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
const evenCheck_controller_1 = require("../../../controllers/evenCheck/evenCheck.controller");
const createEvenCheck = (0, express_1.Router)();
createEvenCheck.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        console.log(field);
        if (!field || !field.event_id || !field.is_confirm || !field.user_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing field',
            });
        }
        const even_check = yield (0, evenCheck_controller_1.create_event_check_controller)(field);
        if (!(even_check === null || even_check === void 0 ? void 0 : even_check.success)) {
            throw new Error(even_check === null || even_check === void 0 ? void 0 : even_check.message);
        }
        return res.status(201).json({
            success: true,
            data: even_check === null || even_check === void 0 ? void 0 : even_check.data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server: ${error === null || error === void 0 ? void 0 : error.message}`,
        });
    }
}));
exports.default = createEvenCheck;
