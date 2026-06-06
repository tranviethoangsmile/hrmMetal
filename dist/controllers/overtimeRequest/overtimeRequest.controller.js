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
exports.get_overtime_request_by_user_id_controller = exports.update_approved_admin_overtime_request_controller = exports.delete_overtime_request_by_id_controller = exports.update_isConfirm_ovetime_request_controller = exports.get_overtime_request_by_id_controller = exports.get_all_overtime_request_controller = exports.create_overtime_request_controller = void 0;
const useCases_1 = require("../../useCases");
const create_overtime_request_controller = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.create_overtime_request_usecase)(data);
});
exports.create_overtime_request_controller = create_overtime_request_controller;
const get_all_overtime_request_controller = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.get_all_overtime_request_usecase)();
});
exports.get_all_overtime_request_controller = get_all_overtime_request_controller;
const get_overtime_request_by_id_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.get_ovetime_request_by_id_usecase)(id);
});
exports.get_overtime_request_by_id_controller = get_overtime_request_by_id_controller;
const update_isConfirm_ovetime_request_controller = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.update_isConfirm_ovetime_request_usecase)(data);
});
exports.update_isConfirm_ovetime_request_controller = update_isConfirm_ovetime_request_controller;
const delete_overtime_request_by_id_controller = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.delete_overtime_request_by_id_usecase)(data);
});
exports.delete_overtime_request_by_id_controller = delete_overtime_request_by_id_controller;
const update_approved_admin_overtime_request_controller = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.update_approved_admin_overtime_request_usecase)(data);
});
exports.update_approved_admin_overtime_request_controller = update_approved_admin_overtime_request_controller;
const get_overtime_request_by_user_id_controller = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.get_overtime_request_by_user_id_usecase)(userId);
});
exports.get_overtime_request_by_user_id_controller = get_overtime_request_by_user_id_controller;
