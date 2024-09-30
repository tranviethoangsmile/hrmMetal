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
const models_1 = require("../../models");
class PaidLeaveRequestRepository {
    get_paid_lead_with_id_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paid_leave = yield models_1.PaidLeaveRequest.findOne({
                    where: { id: id },
                });
                if (paid_leave === null) {
                    throw new Error('Paid leave not exist');
                }
                return {
                    success: true,
                    data: paid_leave,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    create_paid_leave_request(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paid_leave_request = yield models_1.PaidLeaveRequest.create(Object.assign({}, data));
                if (paid_leave_request === null) {
                    throw new Error(`create paid leave request failed`);
                }
                return {
                    success: true,
                    data: paid_leave_request,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    search_leave_request_with_field_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaves = yield models_1.PaidLeaveRequest.findAll({
                    where: Object.assign({}, field),
                    attributes: [
                        'id',
                        'date_leave',
                        'reason',
                        'is_approve',
                        'user_id',
                        'leader_id',
                        'is_confirm',
                        'date_request',
                        'position',
                        'is_paid',
                        'is_half',
                        'feedback',
                    ],
                    include: [
                        {
                            model: models_1.User,
                            as: 'staff',
                            attributes: ['id', 'name'],
                            include: [
                                {
                                    model: models_1.Department,
                                    as: 'department',
                                    attributes: ['id', 'name'],
                                },
                            ],
                        },
                        {
                            model: models_1.User,
                            as: 'leader',
                            attributes: ['id', 'name'],
                            include: [
                                {
                                    model: models_1.Department,
                                    as: 'department',
                                    attributes: ['id', 'name'],
                                },
                            ],
                        },
                    ],
                });
                if (leaves === null || leaves.length < 1) {
                    throw new Error(`data not found`);
                }
                return {
                    success: true,
                    data: leaves,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    find_all_paid_leave() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paid_leave_requests = yield models_1.PaidLeaveRequest.findAll({
                    attributes: ['id', 'date', 'reason', 'is_active'],
                    include: [
                        {
                            model: models_1.User,
                            as: 'staff',
                            attributes: ['id', 'name'],
                            include: [
                                {
                                    model: models_1.Department,
                                    as: 'department',
                                    attributes: ['id', 'name'],
                                },
                            ],
                        },
                        {
                            model: models_1.User,
                            as: 'leader',
                            attributes: ['id', 'name'],
                            include: [
                                {
                                    model: models_1.Department,
                                    as: 'department',
                                    attributes: ['id', 'name'],
                                },
                            ],
                        },
                    ],
                });
                if (paid_leave_requests === null ||
                    paid_leave_requests.length < 1) {
                    throw new Error(`data not found`);
                }
                return {
                    success: true,
                    data: paid_leave_requests,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    update_active_paid_leave(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update_paid_leave = yield models_1.PaidLeaveRequest.update({ is_approve: true }, {
                    where: {
                        id: id,
                    },
                });
                if (update_paid_leave.toString() !== '1') {
                    throw new Error('failed');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    update_un_approve_leave_request_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update_feelback_request = yield models_1.PaidLeaveRequest.update(Object.assign(Object.assign({}, field), { is_approve: false }), {
                    where: { id: field.id },
                });
                if (update_feelback_request.toString() !== '1') {
                    throw new Error('update failed');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    update_confirm_from_admin_paid_leave_request_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update_confirm = yield models_1.PaidLeaveRequest.update(Object.assign(Object.assign({}, field), { is_confirm: true }), {
                    where: {
                        id: field.id,
                    },
                });
                if (update_confirm.toString() !== '1') {
                    throw new Error('failed');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
}
exports.default = PaidLeaveRequestRepository;
