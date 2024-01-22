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
exports.find_one_order = exports.search_order_for_user_in_month = exports.delete_order = exports.find_order = exports.find_all_order = exports.create = void 0;
const models_1 = require("../models");
const department_model_1 = __importDefault(require("../models/department.model"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const sequelize_1 = require("sequelize");
const create = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_order = yield models_1.Order.create(Object.assign({}, order));
        if (new_order != null) {
            return {
                success: true,
                data: new_order,
            };
        }
        else {
            return {
                success: false,
                messgae: 'create order failed',
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
exports.create = create;
const find_all_order = () => __awaiter(void 0, void 0, void 0, function* () {
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
                {
                    model: models_1.Canteen,
                    as: 'canteen',
                    attributes: ['id', 'factory_name'],
                },
            ],
        });
        if (orders != null) {
            return {
                success: true,
                data: orders,
            };
        }
        else {
            return {
                success: false,
                message: 'Order not found',
            };
        }
    }
    catch (error) {
        return {
            success: true,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.find_all_order = find_all_order;
const find_one_order = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
                {
                    model: models_1.Canteen,
                    as: 'canteen',
                    attributes: ['id', 'factory_name'],
                },
            ],
        });
        if (order != null) {
            return {
                success: true,
                data: order,
            };
        }
        else {
            return {
                success: false,
                message: 'Order not found',
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
exports.find_one_order = find_one_order;
const find_order = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield models_1.Order.findAll({
            where: Object.assign({}, field),
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
                {
                    model: models_1.Canteen,
                    as: 'canteen',
                    attributes: ['id', 'factory_name'],
                },
            ],
        });
        if (orders != null) {
            return {
                success: true,
                data: orders,
            };
        }
        else {
            return {
                success: false,
                message: 'Order not found',
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
exports.find_order = find_order;
const delete_order = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.Order.destroy({
            where: {
                id: id,
            },
        });
        if (result === 1) {
            return {
                success: true,
                message: 'delete order was successful',
            };
        }
        else {
            return {
                success: false,
                message: 'delete order failed',
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
exports.delete_order = delete_order;
const search_order_for_user_in_month = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (orders != null) {
            return {
                success: true,
                data: orders,
            };
        }
        else {
            return {
                success: false,
                message: 'Order not found',
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
exports.search_order_for_user_in_month = search_order_for_user_in_month;
