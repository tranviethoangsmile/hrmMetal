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
const searchEventCheckedRouter = (0, express_1.Router)();
searchEventCheckedRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const field = req.body;
        if (!field || !field.event_id || !field.user_id) {
            return res
                .status(400)
                .json({ success: false, message: 'Bad Request' });
        }
        const result = yield (0, evenCheck_controller_1.search_event_checked_controller)(field);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(result === null || result === void 0 ? void 0 : result.message);
        }
        return res.status(202).json({
            success: true,
            data: result === null || result === void 0 ? void 0 : result.data,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server: ${error.message}`,
        });
    }
}));
exports.default = searchEventCheckedRouter;
