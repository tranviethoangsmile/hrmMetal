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
exports.update_paid_leave = exports.find_paid_leave = exports.create_paid_leave = void 0;
const paidLeaveRequest_repository_1 = require("../repositorys/paidLeaveRequest.repository");
const paidLeaveRequest_validate_1 = require("../validates/paidLeaveRequest.validate");
const create_paid_leave = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, paidLeaveRequest_validate_1.validate_create)(data);
        if (!valid.error) {
            const paid_leave = yield (0, paidLeaveRequest_repository_1.create_paid_leave_request)(data);
            if (paid_leave.success) {
                return {
                    success: true,
                    data: paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.data,
                };
            }
            else {
                return {
                    success: false,
                    message: paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.message,
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
exports.create_paid_leave = create_paid_leave;
const find_paid_leave = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paid_leaves = yield (0, paidLeaveRequest_repository_1.find_all_paid_leave)();
        if (paid_leaves.success) {
            return {
                success: true,
                data: paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.data,
            };
        }
        else {
            return {
                success: false,
                message: paid_leaves === null || paid_leaves === void 0 ? void 0 : paid_leaves.message,
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
exports.find_paid_leave = find_paid_leave;
const update_paid_leave = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, paidLeaveRequest_validate_1.validate_update)(data);
        if (!(valid === null || valid === void 0 ? void 0 : valid.error)) {
            const paid_leave = yield (0, paidLeaveRequest_repository_1.update_active_paid_leave)(data.id);
            if (paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.success) {
                return {
                    success: true,
                    data: paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.data,
                };
            }
            else {
                return {
                    success: false,
                    message: paid_leave === null || paid_leave === void 0 ? void 0 : paid_leave.message,
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
exports.update_paid_leave = update_paid_leave;
