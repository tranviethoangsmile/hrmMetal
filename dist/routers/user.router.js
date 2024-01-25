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
const user_controller_1 = require("../controllers/user.controller");
const userRouters = (0, express_1.Router)();
userRouters.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_controller_1.findAll)();
        if (users === null || users === void 0 ? void 0 : users.success) {
            res.status(201).send({
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
        if (user != null) {
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
        else {
            res.status(400).json({
                success: false,
                message: 'data not empty',
            });
        }
    }
    catch (error) {
        return {
            success: false,
            message: 'server error: ' + error.message,
        };
    }
}));
userRouters.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        if (user != null) {
            const data = yield (0, user_controller_1.update)(user);
            if (data === null || data === void 0 ? void 0 : data.success) {
                res.status(201).send({
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
        if (id != null) {
            const data = yield (0, user_controller_1.destroy)(id);
            if (data === null || data === void 0 ? void 0 : data.success) {
                res.status(201).send({
                    success: true,
                    message: 'deleted',
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: 'delete failed',
                });
            }
        }
        else {
            res.status(200).json({
                success: false,
                message: 'id not empty',
            });
        }
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
        if (id) {
            const data = yield (0, user_controller_1.findById)(id);
            if (data === null || data === void 0 ? void 0 : data.success) {
                res.status(201).send({
                    success: true,
                    data: data === null || data === void 0 ? void 0 : data.data,
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: data === null || data === void 0 ? void 0 : data.message,
                });
            }
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + error.message,
        });
    }
}));
exports.default = userRouters;
