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
const createMessageRouter = (0, express_1.Router)();
createMessageRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mess = req.body;
        if (!mess || !mess.conversation_id || !mess.message || !mess.user_id) {
            return res.status(400).json({
                success: false,
                message: 'data not empty',
            });
        }
        const new_mess = yield (0, controllers_1.create_message_controller)(mess);
        if (new_mess === null || new_mess === void 0 ? void 0 : new_mess.success) {
            return res.status(201).json({
                success: true,
                data: new_mess === null || new_mess === void 0 ? void 0 : new_mess.data,
            });
        }
        else {
            return res.status(200).json({
                success: false,
                message: new_mess === null || new_mess === void 0 ? void 0 : new_mess.message,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = createMessageRouter;
