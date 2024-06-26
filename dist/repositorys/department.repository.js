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
exports.getDepartmentById = exports.departmentList = exports.createDepartment = void 0;
const models_1 = require("../models");
const createDepartment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_department = yield models_1.Department.create({
            name: data.name,
        });
        if (new_department) {
            return {
                success: true,
                data: new_department,
            };
        }
        else {
            return {
                success: false,
                message: 'create department error',
            };
        }
    }
    catch (error) {
        return {
            success: true,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.createDepartment = createDepartment;
// fix
const departmentList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield models_1.Department.findAll({
            attributes: ['name'],
        });
        if (departments != null) {
            return {
                success: true,
                data: departments,
            };
        }
        else {
            return {
                success: false,
                message: 'departments not found',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.departmentList = departmentList;
const getDepartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dep = yield models_1.Department.findOne({
            where: {
                id: id,
            },
            attributes: ['name'],
        });
        if (dep != null) {
            return {
                success: true,
                data: dep,
            };
        }
        else {
            return {
                success: false,
                message: 'department not found',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.getDepartmentById = getDepartmentById;
