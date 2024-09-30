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
const department_validate_1 = require("../../validates/department/department.validate");
const validates_1 = require("../../validates");
const repositorys_1 = require("../../repositorys");
const departmentRepository = new repositorys_1.DepartmentRepository();
const departmentCreate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = yield (0, department_validate_1.validation_department_create)(data);
        if (!valid.error) {
            const newDepartment = yield departmentRepository.createDepartment(data);
            if (newDepartment === null || newDepartment === void 0 ? void 0 : newDepartment.success) {
                return {
                    success: true,
                    data: newDepartment === null || newDepartment === void 0 ? void 0 : newDepartment.data,
                };
            }
            else {
                return {
                    success: false,
                    message: newDepartment === null || newDepartment === void 0 ? void 0 : newDepartment.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: valid === null || valid === void 0 ? void 0 : valid.error.message,
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
exports.departmentCreate = departmentCreate;
const getDepartmentList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield departmentRepository.departmentList();
        if (departments === null || departments === void 0 ? void 0 : departments.success) {
            return {
                success: true,
                data: departments === null || departments === void 0 ? void 0 : departments.data,
            };
        }
        else {
            return {
                success: false,
                message: departments === null || departments === void 0 ? void 0 : departments.message,
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
exports.getDepartmentList = getDepartmentList;
const getDepById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validId = (0, validates_1.validation_id)(id);
        if (!validId.error) {
            const department = yield departmentRepository.getDepartmentById(id);
            if (department === null || department === void 0 ? void 0 : department.success) {
                return {
                    success: true,
                    data: department === null || department === void 0 ? void 0 : department.data,
                };
            }
            else {
                return {
                    success: false,
                    message: department === null || department === void 0 ? void 0 : department.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: validId.error.message,
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
exports.getDepById = getDepById;
