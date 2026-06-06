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
exports.get_overtime_request_by_user_id_usecase = exports.update_approved_admin_overtime_request_usecase = exports.delete_overtime_request_by_id_usecase = exports.get_ovetime_request_by_id_usecase = exports.update_isConfirm_ovetime_request_usecase = exports.get_all_overtime_request_usecase = exports.create_overtime_request_usecase = void 0;
const repositorys_1 = require("../../repositorys");
const validates_1 = require("../../validates");
const index_1 = require("../index");
const enum_1 = require("../../enum");
const services_1 = require("../../services");
const overtimeRequestRepo = new repositorys_1.OvertimeRequestRepository();
const pushNotificationService = new services_1.PushNotificationService();
const create_overtime_request_usecase = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const isVlalid = (0, validates_1.validate_create_overtime_request)(data);
        if (isVlalid.error) {
            throw new Error(isVlalid.error.message);
        }
        const user = yield (0, index_1.findUserById)(data.user_id);
        if (!user.success) {
            throw new Error(user.message);
        }
        if (data.department_id !== ((_a = user.data) === null || _a === void 0 ? void 0 : _a.department_id)) {
            throw new Error('Department ID is invalid');
        }
        const leader = yield (0, index_1.findUserById)(data === null || data === void 0 ? void 0 : data.leader_id);
        if (!leader.success) {
            throw new Error(leader.message);
        }
        if (((_b = leader.data) === null || _b === void 0 ? void 0 : _b.role.toString()) === 'STAFF') {
            throw new Error('Leader is invalid');
        }
        const department = yield (0, index_1.getDepById)(data === null || data === void 0 ? void 0 : data.department_id);
        if (!department.success) {
            throw new Error(department.message);
        }
        if (!Object.values(enum_1.Position).includes(data === null || data === void 0 ? void 0 : data.position)) {
            throw new Error('Position is invalid');
        }
        if (!Object.values(enum_1.OVERTIME_REQUEST_HOUR).includes(data === null || data === void 0 ? void 0 : data.overtime_hours)) {
            throw new Error('Overtime Request Hour is invalid');
        }
        const overtimeRequest = yield overtimeRequestRepo.CREATE(data);
        if (!overtimeRequest.success) {
            throw new Error(overtimeRequest.message);
        }
        const fcm_token = yield (0, index_1.find_fcm_token_of_user_use)(data.user_id);
        if (fcm_token === null || fcm_token === void 0 ? void 0 : fcm_token.success) {
            const fcmToken = (_c = fcm_token.data) !== null && _c !== void 0 ? _c : '';
            const title = `Overtime ${data.date}`;
            const body = `Overtime request from ${(_d = leader.data) === null || _d === void 0 ? void 0 : _d.name} in ${(_e = department.data) === null || _e === void 0 ? void 0 : _e.name} department`;
            const key = '';
            yield pushNotificationService.handlePushNotiForMessage({
                fcmToken,
                title,
                body,
                key,
            });
        }
        try {
            const field_notification = {
                title: 'OVERTIME REQUEST',
                user_id: data.user_id,
                type: 'INFO',
                message: `Overtime Request from ${(_f = leader.data) === null || _f === void 0 ? void 0 : _f.name} in ${(_g = department.data) === null || _g === void 0 ? void 0 : _g.name} department`,
            };
            const notification = yield (0, index_1.create_notification_usecase)(field_notification);
            if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                console.error(`Notification creation failed: ${notification === null || notification === void 0 ? void 0 : notification.message}`);
            }
        }
        catch (error) {
            console.error(`Notification error: ${error === null || error === void 0 ? void 0 : error.message}`);
        }
        return {
            success: true,
            data: overtimeRequest.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `usecase error :: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.create_overtime_request_usecase = create_overtime_request_usecase;
const get_all_overtime_request_usecase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const overtime_requests = yield overtimeRequestRepo.GET_ALL();
        if (!overtime_requests.success) {
            throw new Error(overtime_requests.message);
        }
        return {
            success: true,
            data: overtime_requests.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `usecase error :: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.get_all_overtime_request_usecase = get_all_overtime_request_usecase;
const get_ovetime_request_by_id_usecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isVlalid = (0, validates_1.validation_id)(id);
        if (isVlalid.error) {
            throw new Error(isVlalid.error.message);
        }
        const overtime_request = yield overtimeRequestRepo.GET_BY_ID(id);
        if (!overtime_request.success) {
            throw new Error(overtime_request.message);
        }
        return {
            success: true,
            data: overtime_request.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `usecase error :: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.get_ovetime_request_by_id_usecase = get_ovetime_request_by_id_usecase;
const update_isConfirm_ovetime_request_usecase = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isVlalid = (0, validates_1.validate_update_is_confirm_overtime_request)(data);
        if (isVlalid.error) {
            throw new Error(isVlalid.error.message);
        }
        const user = yield (0, index_1.findUserById)(data.user_id);
        if (!user.success) {
            throw new Error(user.message);
        }
        const this_overtime = yield overtimeRequestRepo.GET_BY_ID(data.id);
        if (!this_overtime.success) {
            throw new Error(this_overtime.message);
        }
        const overtimeRequest = yield overtimeRequestRepo.UPDATE_CONFIRM(data);
        if (!overtimeRequest.success) {
            throw new Error(overtimeRequest.message);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `usecase error :: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.update_isConfirm_ovetime_request_usecase = update_isConfirm_ovetime_request_usecase;
const delete_overtime_request_by_id_usecase = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        const isVlalid = (0, validates_1.validate_delete_overtime_request)(data);
        if (isVlalid.error) {
            throw new Error(isVlalid.error.message);
        }
        const request = yield overtimeRequestRepo.GET_BY_ID(data.id);
        if (!request.success) {
            throw new Error(request.message);
        }
        if (((_h = request.data) === null || _h === void 0 ? void 0 : _h.leader_id) !== data.user_id) {
            throw new Error('You are not allowed to delete this request');
        }
        const overtime_request = yield overtimeRequestRepo.DELETE_BY_ID(data.id);
        if (!overtime_request.success) {
            throw new Error(overtime_request.message);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `usecase error :: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.delete_overtime_request_by_id_usecase = delete_overtime_request_by_id_usecase;
const update_approved_admin_overtime_request_usecase = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isVlalid = (0, validates_1.validate_update_approved_admin_overtime_request)(data);
        if (isVlalid.error) {
            throw new Error(isVlalid.error.message);
        }
        const this_overtime = yield overtimeRequestRepo.GET_BY_ID(data.id);
        if (!this_overtime.success) {
            throw new Error(this_overtime.message);
        }
        const overtimeRequest = yield overtimeRequestRepo.UPDATE_APPROVE_ADMIN(data);
        if (!overtimeRequest.success) {
            throw new Error(overtimeRequest.message);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `usecase error :: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.update_approved_admin_overtime_request_usecase = update_approved_admin_overtime_request_usecase;
const get_overtime_request_by_user_id_usecase = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isVlalid = (0, validates_1.validation_id)(userId);
        if (isVlalid.error) {
            throw new Error(isVlalid.error.message);
        }
        const overtime_requests = yield overtimeRequestRepo.GET_BY_USER_ID(userId);
        if (!overtime_requests.success) {
            throw new Error(overtime_requests.message);
        }
        return {
            success: true,
            data: overtime_requests.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `usecase error :: ${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.get_overtime_request_by_user_id_usecase = get_overtime_request_by_user_id_usecase;
