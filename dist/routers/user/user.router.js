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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controllers/user/user.controller");
const uploadRouterModul_1 = __importDefault(require("./userRouterModul/uploadRouterModul"));
const findAllUserWithField_1 = __importDefault(require("./userRouterModul/findAllUserWithField"));
const getUserWithDepartmentId_1 = __importDefault(require("./userRouterModul/getUserWithDepartmentId"));
const findByName_1 = __importDefault(require("./userRouterModul/findByName"));
const userRouters = (0, express_1.Router)();
userRouters.use('/getuserwithdepartmentid', getUserWithDepartmentId_1.default);
userRouters.use('/upload-avatar', uploadRouterModul_1.default);
userRouters.use('/finduserwithfield', findAllUserWithField_1.default);
userRouters.use('/findbyname', findByName_1.default);
userRouters.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_controller_1.findAll)();
        if (users === null || users === void 0 ? void 0 : users.success) {
            res.status(200).send({
                success: true,
                data: users === null || users === void 0 ? void 0 : users.data,
            });
        }
        else {
            res.status(200).send({
                success: false,
                message: users === null || users === void 0 ? void 0 : users.message,
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
userRouters.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        if (!user ||
            !user.name ||
            !user.email ||
            !user.user_name ||
            !user.password ||
            !user.dob ||
            !user.employee_id ||
            !user.department_id) {
            throw new Error('bad request');
        }
        if (user.salary_hourly === undefined &&
            user.travel_allowance_pay === undefined &&
            user.shift_night_pay === undefined &&
            user.paid_days === undefined) {
            throw new Error('salary or other not empty');
        }
        const data = yield (0, user_controller_1.create)(user);
        if (data === null || data === void 0 ? void 0 : data.success) {
            res.status(201).send({
                success: true,
                data: data === null || data === void 0 ? void 0 : data.data,
            });
        }
        else {
            res.status(200).send({
                success: false,
                message: data === null || data === void 0 ? void 0 : data.message,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `server message: ${error === null || error === void 0 ? void 0 : error.message}`,
        });
    }
}));
userRouters.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        if (user != null) {
            const data = yield (0, user_controller_1.update)(user);
            if (data === null || data === void 0 ? void 0 : data.success) {
                res.status(202).send({
                    success: true,
                });
            }
            else {
                res.status(200).send({
                    success: false,
                    message: data === null || data === void 0 ? void 0 : data.message,
                });
            }
        }
        else {
            res.status(400).send({
                success: false,
                message: 'data update not empty',
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'server error' + error.massage,
        });
    }
}));
userRouters.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'id not empty',
            });
        }
        const data = yield (0, user_controller_1.destroy)(id);
        if (!(data === null || data === void 0 ? void 0 : data.success)) {
            return res.status(200).json({
                success: false,
                message: data === null || data === void 0 ? void 0 : data.message,
            });
        }
        return res.status(202).send({
            success: true,
            message: data === null || data === void 0 ? void 0 : data.message,
        });
    }
    catch (error) {
        return {
            success: true,
            message: 'server error: ' + error.massage,
        };
    }
}));
userRouters.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'id not empty',
            });
        }
        const data = yield (0, user_controller_1.findById)(id);
        if (!(data === null || data === void 0 ? void 0 : data.success)) {
            return res.status(200).json({
                success: false,
                message: data === null || data === void 0 ? void 0 : data.message,
            });
        }
        return res.status(202).send({
            success: true,
            data: data === null || data === void 0 ? void 0 : data.data,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + error.message,
        });
    }
}));
exports.default = userRouters;
