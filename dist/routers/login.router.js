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
const login_controller_1 = require("../controllers/login.controller");
const loginRouter = (0, express_1.Router)();
loginRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        console.log(user);
        if (user != null) {
            const token = yield (0, login_controller_1.login)(user);
            if (token === null || token === void 0 ? void 0 : token.success) {
                res.status(201).send({
                    success: true,
                    data: token === null || token === void 0 ? void 0 : token.data,
                    token: token === null || token === void 0 ? void 0 : token.token,
                });
            }
            else {
                res.status(203).send({
                    success: false,
                    message: token === null || token === void 0 ? void 0 : token.message,
                });
            }
        }
        else {
            res.status(400).send({
                success: false,
                message: 'data not empty',
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = loginRouter;
