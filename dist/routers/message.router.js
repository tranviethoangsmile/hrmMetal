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
const message_controller_1 = require("../controllers/message.controller");
const messageRouter = (0, express_1.Router)();
messageRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mess = req.body;
        if (mess && Object.keys(mess).length !== 0) {
            const new_mess = yield (0, message_controller_1.create)(mess);
            if (new_mess === null || new_mess === void 0 ? void 0 : new_mess.success) {
                res.status(201).json({
                    success: new_mess === null || new_mess === void 0 ? void 0 : new_mess.success,
                    data: new_mess === null || new_mess === void 0 ? void 0 : new_mess.data,
                });
            }
            else {
                res.status(200).json({
                    success: new_mess === null || new_mess === void 0 ? void 0 : new_mess.success,
                    message: new_mess === null || new_mess === void 0 ? void 0 : new_mess.message,
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
        res.status(500).json({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = messageRouter;
