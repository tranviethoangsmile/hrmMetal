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
exports.getDepById = exports.getDepartmentList = exports.departmentCreate = void 0;
const validates_1 = require("../../validates");
const repositorys_1 = require("../../repositorys");
const departmentRepository = new repositorys_1.DepartmentRepository();
const departmentCreate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, validates_1.validation_department_create)(data);
        if (valid === null || valid === void 0 ? void 0 : valid.error) {
            throw new Error(valid === null || valid === void 0 ? void 0 : valid.error.message);
        }
        const newDepartment = yield departmentRepository.createDepartment(data);
        if (!(newDepartment === null || newDepartment === void 0 ? void 0 : newDepartment.success)) {
            throw new Error(newDepartment === null || newDepartment === void 0 ? void 0 : newDepartment.message);
        }
        return {
            success: true,
            data: newDepartment === null || newDepartment === void 0 ? void 0 : newDepartment.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.departmentCreate = departmentCreate;
const getDepartmentList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield departmentRepository.departmentList();
        if (!(departments === null || departments === void 0 ? void 0 : departments.success)) {
            throw new Error(departments === null || departments === void 0 ? void 0 : departments.message);
        }
        return {
            success: true,
            data: departments === null || departments === void 0 ? void 0 : departments.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.getDepartmentList = getDepartmentList;
const getDepById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validId = (0, validates_1.validation_id)(id);
        if (validId.error) {
            throw new Error(validId === null || validId === void 0 ? void 0 : validId.error.message);
        }
        const department = yield departmentRepository.getDepartmentById(id);
        if (!(department === null || department === void 0 ? void 0 : department.success)) {
            throw new Error(department === null || department === void 0 ? void 0 : department.message);
        }
        return {
            success: true,
            data: department === null || department === void 0 ? void 0 : department.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.getDepById = getDepById;
