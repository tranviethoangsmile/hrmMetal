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
const paidLeaveRequest_controller_1 = require("../../../controllers/paidLeaveRequest/paidLeaveRequest.controller");
const create_router = (0, express_1.Router)();
create_router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data === null || typeof data !== 'object') {
            return res.status(400).json({
                success: false,
                message: 'Data do not empty',
            });
        }
        else {
            const result = yield (0, paidLeaveRequest_controller_1.create)(data);
            if (!(result === null || result === void 0 ? void 0 : result.success)) {
                res.status(200).json({
                    success: false,
                    message: result === null || result === void 0 ? void 0 : result.message,
                });
            }
            else {
                res.status(201).json({
                    success: true,
                    data: result === null || result === void 0 ? void 0 : result.data,
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Sever Error ' + error.message,
        });
    }
}));
exports.default = create_router;
