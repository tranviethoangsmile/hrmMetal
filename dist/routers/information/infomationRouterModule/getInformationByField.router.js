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
const information_controller_1 = require("../../../controllers/information/information.controller");
const searchAllRouter = (0, express_1.Router)();
searchAllRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body.field;
        if (!field) {
            return res.status(400).json({
                success: false,
                message: 'Missing field',
            });
        }
        else {
            const informations = yield (0, information_controller_1.search_all_information_with_field_controller)(field);
            if (informations === null || informations === void 0 ? void 0 : informations.success) {
                return res.status(202).json({
                    success: informations === null || informations === void 0 ? void 0 : informations.success,
                    data: informations === null || informations === void 0 ? void 0 : informations.data,
                });
            }
            else {
                return res.status(200).json({
                    success: informations === null || informations === void 0 ? void 0 : informations.success,
                    message: informations === null || informations === void 0 ? void 0 : informations.message,
                });
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = searchAllRouter;
