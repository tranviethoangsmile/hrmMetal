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
exports.get_all_safety_report_by_department_id_controller = exports.get_all_safety_report_by_user_id_controller = exports.delete_safety_report_controller = exports.confirm_safety_report_controller = exports.update_safety_report_controller = exports.create_safety_report_controller = void 0;
const useCases_1 = require("../../useCases");
const create_safety_report_controller = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.create_safety_report_usecase)(data);
});
exports.create_safety_report_controller = create_safety_report_controller;
const update_safety_report_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.update_safety_report_usecase)(field);
});
exports.update_safety_report_controller = update_safety_report_controller;
const confirm_safety_report_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.confirm_safety_report_usecase)(field);
});
exports.confirm_safety_report_controller = confirm_safety_report_controller;
const delete_safety_report_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.delete_safety_report_usecase)(field);
});
exports.delete_safety_report_controller = delete_safety_report_controller;
const get_all_safety_report_by_user_id_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.get_all_safety_report_by_user_id_usecase)(field);
});
exports.get_all_safety_report_by_user_id_controller = get_all_safety_report_by_user_id_controller;
const get_all_safety_report_by_department_id_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.get_all_safety_report_by_department_id_usecase)(id);
});
exports.get_all_safety_report_by_department_id_controller = get_all_safety_report_by_department_id_controller;
