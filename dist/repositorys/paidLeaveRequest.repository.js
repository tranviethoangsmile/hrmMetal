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
exports.update_active_paid_leave = exports.find_all_paid_leave = exports.create_paid_leave_request = void 0;
const models_1 = require("../models");
const create_paid_leave_request = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paid_leave_request = yield models_1.PaidLeaveRequest.create(Object.assign({}, data));
        if (paid_leave_request != null) {
            return {
                success: true,
                data: paid_leave_request,
            };
        }
        else {
            return {
                success: false,
                message: 'create paid leave request failed',
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
exports.create_paid_leave_request = create_paid_leave_request;
const find_all_paid_leave = () => __awaiter(void 0, void 0, void 0, function* () {
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
        if (paid_leave_requests != null) {
            return {
                success: true,
                data: paid_leave_requests,
            };
        }
        else {
            return {
                success: false,
                message: 'find all paid leave failed',
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
exports.find_all_paid_leave = find_all_paid_leave;
const update_active_paid_leave = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update_paid_leave = yield models_1.PaidLeaveRequest.update({ is_active: true }, {
            where: {
                id: id,
            },
        });
        console.log(update_paid_leave);
        if (update_paid_leave.toString() === '1') {
            const paid_leave_result = yield models_1.PaidLeaveRequest.findByPk(id, {
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
            if (paid_leave_result != null) {
                return {
                    success: true,
                    data: paid_leave_result,
                };
            }
            else {
                return {
                    success: true,
                    data: null,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'update paid leave failed',
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
exports.update_active_paid_leave = update_active_paid_leave;
