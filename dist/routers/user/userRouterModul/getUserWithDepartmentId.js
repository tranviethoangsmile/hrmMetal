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
const getUserWithDepartmentId = (0, express_1.Router)();
getUserWithDepartmentId.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.department_id;
        if (id != null) {
            const listUser = yield (0, user_controller_1.getUserForLeaveFeatureControll)(id);
            if (listUser === null || listUser === void 0 ? void 0 : listUser.success) {
                res.status(202).json({
                    success: true,
                    data: listUser === null || listUser === void 0 ? void 0 : listUser.data,
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: listUser === null || listUser === void 0 ? void 0 : listUser.message,
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
exports.default = getUserWithDepartmentId;
