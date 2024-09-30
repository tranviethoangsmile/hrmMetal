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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const department_model_1 = __importDefault(require("../../models/department.model"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const sequelize_1 = require("sequelize");
class OrderRepository {
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const new_order = yield models_1.Order.create(Object.assign({}, order));
                if (new_order === null) {
                    throw new Error(`create order failed`);
                }
                return {
                    success: true,
                    data: new_order,
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
    find_all_order() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield models_1.Order.findAll({
                    include: [
                        {
                            model: models_1.User,
                            as: 'user',
                            attributes: ['id', 'name', 'employee_id'],
                            include: [
                                {
                                    model: department_model_1.default,
                                    as: 'department',
                                    attributes: ['name'],
                                },
                            ],
                        },
                    ],
                });
                if (orders === null || orders.length < 1) {
                    throw new Error(`order not found`);
                }
                return {
                    success: true,
                    data: orders,
                };
            }
            catch (error) {
                return {
                    success: true,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    find_one_order(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield models_1.Order.findOne({
                    where: {
                        id: id,
                    },
                    attributes: ['id', 'date'],
                    include: [
                        {
                            model: models_1.User,
                            as: 'user',
                            attributes: ['id', 'name', 'employee_id'],
                            include: [
                                {
                                    model: department_model_1.default,
                                    as: 'department',
                                    attributes: ['name'],
                                },
                            ],
                        },
                    ],
                });
                if (order === null) {
                    throw new Error(`order not found`);
                }
                return {
                    success: true,
                    data: order,
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
    find_order(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield models_1.Order.findAll({
                    where: Object.assign({}, field),
                    attributes: ['id', 'date', 'dayOrNight'],
                    include: [
                        {
                            model: models_1.User,
                            as: 'user',
                            attributes: ['id', 'name', 'employee_id'],
                            include: [
                                {
                                    model: department_model_1.default,
                                    as: 'department',
                                    attributes: ['name'],
                                },
                            ],
                        },
                    ],
                });
                if (orders === null || orders.length < 1) {
                    throw new Error(`order not found`);
                }
                return {
                    success: true,
                    data: orders,
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
    delete_order(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.Order.destroy({
                    where: {
                        id: id,
                    },
                });
                if (result !== 1) {
                    throw new Error(`delete order failed`);
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
    search_order_for_user_in_month(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const year = (0, moment_timezone_1.default)().format('YYYY');
                const month = (0, moment_timezone_1.default)().format('MM');
                const orders = yield models_1.Order.findAll({
                    where: {
                        [sequelize_1.Op.and]: [
                            {
                                user_id: id.user_id,
                            },
                            {
                                date: {
                                    [sequelize_1.Op.gte]: (0, moment_timezone_1.default)().format(`${year}/${month}/01`),
                                },
                            },
                            {
                                date: {
                                    [sequelize_1.Op.lt]: (0, moment_timezone_1.default)().format(`${year}/${month}/31`),
                                },
                            },
                        ],
                    },
                });
                if (orders === null || orders.length < 1) {
                    throw new Error(`order not found`);
                }
                return {
                    success: true,
                    data: orders,
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
    checkin_picked_order(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order_picked = yield models_1.Order.update({
                    isPicked: true,
                }, {
                    where: {
                        user_id: field.user_id,
                        date: field.date,
                    },
                });
                if (order_picked[0] < 1) {
                    throw new Error(`picked not success`);
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
exports.default = OrderRepository;
