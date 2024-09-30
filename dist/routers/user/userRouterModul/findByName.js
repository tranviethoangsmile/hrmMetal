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
const userFindByNameRouter = (0, express_1.Router)();
userFindByNameRouter.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        if (!name) {
            return res
                .status(400)
                .json({ success: false, message: 'Name is required' });
        }
        const users = yield (0, controllers_1.findByName)(name);
        if (!(users === null || users === void 0 ? void 0 : users.success)) {
            return res
                .status(200)
                .json({ success: false, message: users === null || users === void 0 ? void 0 : users.message });
        }
        return res.status(202).json({ success: true, data: users === null || users === void 0 ? void 0 : users.data });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server error: ${error.message}`,
        });
    }
}));
exports.default = userFindByNameRouter;
