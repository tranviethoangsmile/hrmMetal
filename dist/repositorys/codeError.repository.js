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
exports.find_err_of_report = exports.create_code_err = void 0;
const index_1 = require("../models/index");
const create_code_err = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errs = yield index_1.CodeError.bulkCreate(data);
        if (errs) {
            return {
                success: true,
                data: errs,
            };
        }
        else {
            return {
                success: false,
                message: 'create failed',
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
exports.create_code_err = create_code_err;
const find_err_of_report = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errs = yield index_1.CodeError.findAll({
            where: Object.assign({}, field),
            attributes: ['code', 'description', 'shutdown_time'],
        });
        if (errs != null) {
            return {
                success: true,
                data: errs,
            };
        }
        else {
            return {
                success: false,
                message: 'error of report not found',
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
exports.find_err_of_report = find_err_of_report;
