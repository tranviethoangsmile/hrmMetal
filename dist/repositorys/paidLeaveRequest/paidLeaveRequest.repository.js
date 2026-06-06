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
    GET_PAID_LEAVE_REQUEST_BY_ID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paid_leave = yield models_1.PaidLeaveRequest.findByPk(id, {
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
                            attributes: ['name', 'avatar'],
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
                            attributes: ['name', 'avatar'],
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
    CREATE_PAID_LEAVE_REQUEST(data) {
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
    SEARCH_PAID_LEAVE_REQUEST_WITH_FIELD(field) {
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
                            attributes: ['id', 'name', 'avatar'],
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
    GET_ALL_PAID_LEAVE_REQUEST_FOR_LEADER_AND_OTHER(leader_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paid_leave_requests = yield models_1.PaidLeaveRequest.findAndCountAll({
                    attributes: ['id', 'date_request', 'reason', 'is_approve', 'date_leave', 'is_half', 'user_id', 'leader_id', 'is_paid'],
                    limit: 10,
                    offset: 0,
                    order: [['created_at', 'DESC']],
                    where: {
                        is_approve: false,
                        leader_id: leader_id,
                    },
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
                    paid_leave_requests.count < 1) {
                    throw new Error(`data not found`);
                }
                return {
                    success: true,
                    data: {
                        rows: paid_leave_requests.rows,
                        count: paid_leave_requests.count
                    },
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
    UPDATE_ACTIVE_PAID_LEAVE_REQUEST(id) {
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
    UPDATE_APPROVE_PAID_LEAVE_REQUEST(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update_feelback_request = yield models_1.PaidLeaveRequest.update(Object.assign({}, field), {
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
    UPDATE_CONFIRM_PAID_LEAVE_REQUEST_FROM_ADMIN(field) {
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
    DELETE_PAID_LEAVE_REQUEST_BY_ID_REPO(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paid_leave_request = yield models_1.PaidLeaveRequest.destroy({
                    where: {
                        id,
                    },
                });
                if (paid_leave_request === 0) {
                    throw new Error(`Failed to delete paid leave request`);
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    GET_ALL_PAID_LEAVE_APPROVED_FOR_ADMIN(position) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paid_leave_request_approveds = yield models_1.PaidLeaveRequest.findAndCountAll({
                    limit: 10,
                    offset: 0,
                    order: [['date_request', 'DESC']],
                    where: {
                        is_approve: true,
                        position: position,
                        is_confirm: false,
                    },
                    attributes: ['id', 'date_request', 'reason', 'is_approve', 'date_leave', 'is_half', 'user_id', 'leader_id', 'is_paid'],
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
                if (paid_leave_request_approveds.count < 1) {
                    return {
                        success: false,
                        message: `paid leave not found`
                    };
                }
                return {
                    success: true,
                    data: {
                        rows: paid_leave_request_approveds.rows,
                        count: paid_leave_request_approveds.count
                    }
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
}
exports.default = PaidLeaveRequestRepository;
