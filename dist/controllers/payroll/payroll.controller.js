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
exports.destroy_payroll_controller = exports.search_payroll_by_id_controller = exports.search_payroll_of_user_in_month_controller = exports.update_payroll_controller = exports.create_payroll_controller = void 0;
const payroll_usecase_1 = require("../../useCases/payroll/payroll.usecase");
const create_payroll_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, payroll_usecase_1.create_payroll_usecase)(field);
});
exports.create_payroll_controller = create_payroll_controller;
const update_payroll_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, payroll_usecase_1.update_payroll_usecase)(field);
});
exports.update_payroll_controller = update_payroll_controller;
const search_payroll_of_user_in_month_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, payroll_usecase_1.search_payroll_of_user_in_month_use)(field);
});
exports.search_payroll_of_user_in_month_controller = search_payroll_of_user_in_month_controller;
const search_payroll_by_id_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, payroll_usecase_1.search_payroll_by_id_usecase)(id);
});
exports.search_payroll_by_id_controller = search_payroll_by_id_controller;
const destroy_payroll_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, payroll_usecase_1.destroy_payroll_usecase)(id);
});
exports.destroy_payroll_controller = destroy_payroll_controller;
