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
exports.update_confirm_from_admin_paid_leave_request_controller = exports.update_un_approve_leave_request_controller = exports.search_leave_request_with_field_controller = exports.update_is_active = exports.get_all = exports.create = void 0;
const paidLeaveRequest_useCase_1 = require("../../useCases/paidLeaveRequest/paidLeaveRequest.useCase");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, paidLeaveRequest_useCase_1.create_paid_leave)(data);
});
exports.create = create;
const get_all = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, paidLeaveRequest_useCase_1.find_paid_leave)();
});
exports.get_all = get_all;
const update_is_active = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, paidLeaveRequest_useCase_1.update_paid_leave)(data);
});
exports.update_is_active = update_is_active;
const search_leave_request_with_field_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, paidLeaveRequest_useCase_1.search_leave_request_with_field_use)(field);
});
exports.search_leave_request_with_field_controller = search_leave_request_with_field_controller;
const update_un_approve_leave_request_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, paidLeaveRequest_useCase_1.update_un_approve_leave_request_use)(field);
});
exports.update_un_approve_leave_request_controller = update_un_approve_leave_request_controller;
const update_confirm_from_admin_paid_leave_request_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, paidLeaveRequest_useCase_1.update_confirm_from_admin_paid_leave_request_use)(field);
});
exports.update_confirm_from_admin_paid_leave_request_controller = update_confirm_from_admin_paid_leave_request_controller;
