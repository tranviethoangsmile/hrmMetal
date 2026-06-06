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
const isAttributes = [
    'id',
    'user_id',
    'department_id',
    'leader_id',
    'description',
    'is_confirm',
    'is_approved',
];
class OvertimeRequestRepository {
    CREATE(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_overtime_request = yield models_1.OvertimeRequest.create(data);
                if (!new_overtime_request) {
                    throw new Error('CREATE OVERTIME REQUEST FAILED');
                }
                return {
                    success: true,
                    data: new_overtime_request,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repository error:${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    GET_ALL() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const overtime_requests = yield models_1.OvertimeRequest.findAll({
                    where: {
                        is_confirm: true,
                        is_approved: false,
                    },
                    attributes: isAttributes,
                    include: [
                        {
                            model: models_1.User,
                            as: 'userDetail',
                            attributes: ['id', 'name', 'avatar'],
                        },
                        {
                            model: models_1.User,
                            as: 'leaderDetail',
                            attributes: ['id', 'name'],
                        },
                        {
                            model: models_1.Department,
                            as: 'departmentDetail',
                            attributes: ['name'],
                        },
                    ],
                    order: [['created_at', 'DESC']],
                });
                if (overtime_requests.length === 0) {
                    throw new Error('No overtime requests found');
                }
                return {
                    success: true,
                    data: overtime_requests,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repository error:${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    GET_BY_ID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const overtime_request = yield models_1.OvertimeRequest.findByPk(id, {
                    attributes: isAttributes,
                    include: [
                        {
                            model: models_1.User,
                            as: 'userDetail',
                            attributes: ['id', 'name', 'avatar'],
                        },
                        {
                            model: models_1.User,
                            as: 'leaderDetail',
                            attributes: ['id', 'name'],
                        },
                        {
                            model: models_1.Department,
                            as: 'departmentDetail',
                            attributes: ['name'],
                        },
                    ],
                });
                if (overtime_request === null) {
                    throw new Error('Overtime request not found');
                }
                return {
                    success: true,
                    data: overtime_request,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repository error:${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    UPDATE_CONFIRM(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.OvertimeRequest.update({
                    is_confirm: true,
                }, {
                    where: {
                        id: data.id,
                    },
                });
                if (result[0] === 0) {
                    throw new Error('Update failed');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repository error:${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    DELETE_BY_ID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.OvertimeRequest.destroy({
                    where: {
                        id,
                    },
                });
                if (result === 0) {
                    throw new Error('Delete failed');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repository error:${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    UPDATE_APPROVE_ADMIN(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.OvertimeRequest.update({
                    is_approved: true,
                }, {
                    where: {
                        id: data.id,
                    },
                });
                if (result[0] === 0) {
                    throw new Error('Update failed');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repository error:${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    GET_BY_USER_ID(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const overtime_requests = yield models_1.OvertimeRequest.findAll({
                    where: {
                        user_id: userId,
                        is_confirm: false,
                    },
                    attributes: [
                        'id',
                        'description',
                        'created_at',
                        'date',
                        'is_confirm',
                    ],
                    include: [
                        {
                            model: models_1.User,
                            as: 'leaderDetail',
                            attributes: ['id', 'name', 'avatar'],
                        },
                        {
                            model: models_1.Department,
                            as: 'departmentDetail',
                            attributes: ['name'],
                        },
                    ],
                });
                return {
                    success: true,
                    data: overtime_requests,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repository error:${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
}
exports.default = OvertimeRequestRepository;
