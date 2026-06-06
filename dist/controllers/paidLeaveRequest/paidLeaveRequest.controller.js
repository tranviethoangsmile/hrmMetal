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
exports.delete_paid_leave_request_by_id_controller = exports.update_confirm_from_admin_paid_leave_request_controller = exports.update_approve_leave_request_controller = exports.search_leave_request_with_field_controller = exports.update_is_active_paid_leave_controller = exports.get_all_paid_leave_controller = exports.create_paid_leave_controller = void 0;
const useCases_1 = require("../../useCases");
const create_paid_leave_controller = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.create_paid_leave)(data);
});
exports.create_paid_leave_controller = create_paid_leave_controller;
const get_all_paid_leave_controller = (leader_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.find_paid_leave)(leader_id);
});
exports.get_all_paid_leave_controller = get_all_paid_leave_controller;
const update_is_active_paid_leave_controller = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.update_paid_leave)(data);
});
exports.update_is_active_paid_leave_controller = update_is_active_paid_leave_controller;
const search_leave_request_with_field_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.search_leave_request_with_field_use)(field);
});
exports.search_leave_request_with_field_controller = search_leave_request_with_field_controller;
const update_approve_leave_request_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.update_approve_leave_request_use)(field);
});
exports.update_approve_leave_request_controller = update_approve_leave_request_controller;
const update_confirm_from_admin_paid_leave_request_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.update_confirm_from_admin_paid_leave_request_use)(field);
});
exports.update_confirm_from_admin_paid_leave_request_controller = update_confirm_from_admin_paid_leave_request_controller;
const delete_paid_leave_request_by_id_controller = (delete_value) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.delete_paid_leave_request_with_by_id_use)(delete_value);
});
exports.delete_paid_leave_request_by_id_controller = delete_paid_leave_request_by_id_controller;
