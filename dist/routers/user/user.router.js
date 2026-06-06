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
const controllers_1 = require("../../controllers");
const helpers_1 = require("../../helpers");
const uploadRouterModul_1 = __importDefault(require("./userRouterModul/uploadRouterModul"));
const findAllUserWithField_1 = __importDefault(require("./userRouterModul/findAllUserWithField"));
const getUserWithDepartmentId_1 = __importDefault(require("./userRouterModul/getUserWithDepartmentId"));
const findByName_1 = __importDefault(require("./userRouterModul/findByName"));
const getAllUserForOtRequestFeature_router_1 = __importDefault(require("./getAllUserForOtRequestFeature/getAllUserForOtRequestFeature.router"));
const userRouters = (0, express_1.Router)();
userRouters.use('/getuserwithdepartmentid', getUserWithDepartmentId_1.default);
userRouters.use('/upload-avatar', uploadRouterModul_1.default);
userRouters.use('/finduserwithfield', findAllUserWithField_1.default);
userRouters.use('/findbyname', findByName_1.default);
userRouters.use('/getalluserforotrequestfeature', getAllUserForOtRequestFeature_router_1.default);
// add admin id with middleware check role
userRouters.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, controllers_1.findAll)();
        if (!(users === null || users === void 0 ? void 0 : users.success)) {
            return (0, helpers_1.errorResponse)(res, 400, (users === null || users === void 0 ? void 0 : users.message) || 'Failed to get users');
        }
        return (0, helpers_1.successResponse)(res, 200, users === null || users === void 0 ? void 0 : users.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
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
            !user.department_id ||
            !user.role ||
            !user.travel_allowance_pay ||
            !user.shift_night_pay ||
            !user.salary_hourly ||
            !user.paid_days) {
            const missingFields = [
                !user.name && 'name',
                !user.email && 'email',
                !user.user_name && 'user_name',
                !user.password && 'password',
                !user.dob && 'dob',
                !user.employee_id && 'employee_id',
                !user.department_id && 'department_id',
                !user.role && 'role',
                !user.paid_days && 'paid_days',
                !user.travel_allowance_pay && 'travel_allowance_pay',
                !user.shift_night_pay && 'shift_night_pay',
                !user.salary_hourly && 'salary_hourly'
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Invalid input: Missing required ${missingFields}`);
        }
        const data = yield (0, controllers_1.create)(user);
        if (!(data === null || data === void 0 ? void 0 : data.success)) {
            return (0, helpers_1.errorResponse)(res, 200, (data === null || data === void 0 ? void 0 : data.message) || 'Failed to create user');
        }
        return (0, helpers_1.successResponse)(res, 201, data === null || data === void 0 ? void 0 : data.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
userRouters.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value_update = req.body;
        if (!(value_update === null || value_update === void 0 ? void 0 : value_update.id)) {
            return (0, helpers_1.errorResponse)(res, 400, 'bad request');
        }
        const result = yield (0, controllers_1.update)(value_update);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            return (0, helpers_1.errorResponse)(res, 200, (result === null || result === void 0 ? void 0 : result.message) || 'Failed to update user');
        }
        return (0, helpers_1.successResponse)(res, 202);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
userRouters.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return (0, helpers_1.errorResponse)(res, 400, 'id is required');
        }
        const data = yield (0, controllers_1.destroy)(id);
        if (!(data === null || data === void 0 ? void 0 : data.success)) {
            return (0, helpers_1.errorResponse)(res, 200, (data === null || data === void 0 ? void 0 : data.message) || 'Failed to delete user');
        }
        return (0, helpers_1.successResponse)(res, 202, undefined, (data === null || data === void 0 ? void 0 : data.message) || 'User deleted successfully');
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
userRouters.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return (0, helpers_1.errorResponse)(res, 400, 'id is required');
        }
        const data = yield (0, controllers_1.findById)(id);
        if (!(data === null || data === void 0 ? void 0 : data.success)) {
            return (0, helpers_1.errorResponse)(res, 200, (data === null || data === void 0 ? void 0 : data.message) || 'User not found');
        }
        return (0, helpers_1.successResponse)(res, 202, data === null || data === void 0 ? void 0 : data.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = userRouters;
