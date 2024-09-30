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
const user_controller_1 = require("../../../controllers/user/user.controller");
const findUser = (0, express_1.Router)();
findUser.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (field != null) {
            const users = yield (0, user_controller_1.findAllUserWithFieldControll)(field);
            if (users === null || users === void 0 ? void 0 : users.success) {
                res.status(202).json({
                    success: users === null || users === void 0 ? void 0 : users.success,
                    data: users === null || users === void 0 ? void 0 : users.data,
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                message: 'data not empty',
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'server error: ' + error.mesage,
        });
    }
}));
exports.default = findUser;
