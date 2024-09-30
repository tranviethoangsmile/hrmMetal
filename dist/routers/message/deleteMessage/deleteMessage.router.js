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
const deleteMessageRouter = (0, express_1.Router)();
deleteMessageRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field || !(field === null || field === void 0 ? void 0 : field.message_id) || !field.user_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const result = yield (0, controllers_1.create_delete_message_cotroller)(field);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            return res
                .status(200)
                .json({ success: false, message: `${result === null || result === void 0 ? void 0 : result.message}` });
        }
        return res
            .status(201)
            .json({ success: true, message: 'Message deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error.message}`,
        });
    }
}));
exports.default = deleteMessageRouter;
