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
exports.update_confirm_from_admin_paid_leave_request_use = exports.update_un_approve_leave_request_use = exports.search_leave_request_with_field_use = exports.update_paid_leave = exports.find_paid_leave = exports.create_paid_leave = void 0;
const validates_1 = require("../../validates");
const repositorys_1 = require("../../repositorys");
const paidLeaveRequestRepository = new repositorys_1.PaidLeaveRequestRepository();
const checkinRepository = new repositorys_1.CheckinRepository();
const update_confirm_from_admin_paid_leave_request_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const pail_leave = yield paidLeaveRequestRepository.get_paid_lead_with_id_repo(field.id);
        if (!(pail_leave === null || pail_leave === void 0 ? void 0 : pail_leave.success)) {
            throw new Error(pail_leave === null || pail_leave === void 0 ? void 0 : pail_leave.message);
        }
        const checkin_field = {
            user_id: (_a = pail_leave === null || pail_leave === void 0 ? void 0 : pail_leave.data) === null || _a === void 0 ? void 0 : _a.user_id,
            date: (_b = pail_leave === null || pail_leave === void 0 ? void 0 : pail_leave.data) === null || _b === void 0 ? void 0 : _b.date_leave,
            is_paid_leave: true,
        };
        const checkin = yield checkinRepository.create_checkin(checkin_field);
        if (!(checkin === null || checkin === void 0 ? void 0 : checkin.success)) {
            throw new Error(checkin === null || checkin === void 0 ? void 0 : checkin.message);
        }
        const update_confirm = yield paidLeaveRequestRepository.update_confirm_from_admin_paid_leave_request_repo(field);
        if (!update_confirm.success) {
            throw new Error(update_confirm === null || update_confirm === void 0 ? void 0 : update_confirm.message);
        }
        return {
            success: true,
            message: update_confirm === null || update_confirm === void 0 ? void 0 : update_confirm.message,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
});
exports.update_confirm_from_admin_paid_leave_request_use = update_confirm_from_admin_paid_leave_request_use;
const update_un_approve_leave_request_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_update_paid)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const update = yield paidLeaveRequestRepository.update_un_approve_leave_request_repo(field);
        if (!(update === null || update === void 0 ? void 0 : update.success)) {
            throw new Error(`${update === null || update === void 0 ? void 0 : update.message}`);
        }
        return {
            success: true,
            message: update === null || update === void 0 ? void 0 : update.message,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.update_un_approve_leave_request_use = update_un_approve_leave_request_use;
const search_leave_request_with_field_use = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_search_paid)(field);
        if (isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const leaves = yield paidLeaveRequestRepository.search_leave_request_with_field_repo(field);
        if (!(leaves === null || leaves === void 0 ? void 0 : leaves.success)) {
            throw new Error(`${leaves === null || leaves === void 0 ? void 0 : leaves.message}`);
        }
        return { success: true, data: leaves === null || leaves === void 0 ? void 0 : leaves.data };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.search_leave_request_with_field_use = search_leave_request_with_field_use;
const create_paid_leave = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, validates_1.validate_create_paid)(data);
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const paid_leave = yield paidLeaveRequestRepository.create_paid_leave_request(data);
        if (!paid_leave.success) {
            throw new Error(`${paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.message}`);
        }
        return {
            success: true,
            data: paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.create_paid_leave = create_paid_leave;
const find_paid_leave = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paid_leaves = yield paidLeaveRequestRepository.find_all_paid_leave();
        if (!paid_leaves.success) {
            throw new Error(`${paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.message}`);
        }
        return {
            success: true,
            data: paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.find_paid_leave = find_paid_leave;
const update_paid_leave = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, validates_1.validate_update_paid)(data);
        if (valid === null || valid === void 0 ? void 0 : valid.error) {
            throw new Error(valid === null || valid === void 0 ? void 0 : valid.error.message);
        }
        const paid_leave = yield paidLeaveRequestRepository.update_active_paid_leave(data.id);
        if (!(paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.success)) {
            throw new Error(`${paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.message}`);
        }
        return {
            success: true,
            message: paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.message,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.update_paid_leave = update_paid_leave;
