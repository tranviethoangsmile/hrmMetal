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
const router = (0, express_1.Router)();
const department_controller_1 = require("../../controllers/department/department.controller");
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield (0, department_controller_1.departmentList)();
        if (departments === null || departments === void 0 ? void 0 : departments.success) {
            return res.status(202).send({
                success: true,
                data: departments === null || departments === void 0 ? void 0 : departments.data,
            });
        }
        else {
            return res.status(200).send({
                success: false,
                message: departments === null || departments === void 0 ? void 0 : departments.message,
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
/**
 * @openapi
 * /department:
 * post:
 *  tags:
 *      -Department
 *  summary: Create Department
 *  reqestBody:
 *      requied: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref:
 *          responses:
 *              201:
 *                  description: success
 *              200:
 *                  description: success
 *
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dep = req.body;
        if (dep != null) {
            const department = yield (0, department_controller_1.createDep)(dep);
            if (department === null || department === void 0 ? void 0 : department.success) {
                return res.status(201).send({
                    success: true,
                    data: department === null || department === void 0 ? void 0 : department.data,
                });
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: department === null || department === void 0 ? void 0 : department.message,
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'data not empty',
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const department = yield (0, department_controller_1.getDepartmentById)(id);
        if (department === null || department === void 0 ? void 0 : department.success) {
            return res.status(202).send({
                success: true,
                data: department === null || department === void 0 ? void 0 : department.data,
            });
        }
        else {
            return res.status(200).send({
                success: false,
                message: department === null || department === void 0 ? void 0 : department.message,
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = router;
