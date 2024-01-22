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
exports.search_order_user = exports.delete_order_by_id = exports.search_order = exports.find_all = exports.create_order = void 0;
const validates_1 = require("../validates");
const user_repository_1 = require("../repositorys/user.repository");
const order_repository_1 = require("../repositorys/order.repository");
const order_validate_1 = require("../validates/order.validate");
const create_order = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, order_validate_1.validate_create_order)(order);
        if (!valid.error) {
            const user = yield (0, user_repository_1.userFindById)(order.user_id);
            if (user === null || user === void 0 ? void 0 : user.success) {
                const created_order = yield (0, order_repository_1.create)(order);
                if (created_order === null || created_order === void 0 ? void 0 : created_order.success) {
                    return {
                        success: true,
                        data: created_order === null || created_order === void 0 ? void 0 : created_order.data,
                    };
                }
                else {
                    return {
                        success: false,
                        message: created_order === null || created_order === void 0 ? void 0 : created_order.message,
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: 'User not found',
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
exports.create_order = create_order;
const find_all = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, order_repository_1.find_all_order)();
        if (orders === null || orders === void 0 ? void 0 : orders.success) {
            return {
                success: true,
                data: orders === null || orders === void 0 ? void 0 : orders.data,
            };
        }
        else {
            return {
                success: false,
                message: orders === null || orders === void 0 ? void 0 : orders.message,
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
exports.find_all = find_all;
const search_order = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, order_validate_1.validate_search_order)(order);
        if (!valid.error) {
            const orders = yield (0, order_repository_1.find_order)(order);
            if (orders.success) {
                return {
                    success: true,
                    data: orders === null || orders === void 0 ? void 0 : orders.data,
                };
            }
            else {
                return {
                    success: false,
                    message: orders === null || orders === void 0 ? void 0 : orders.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'data not valid',
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
exports.search_order = search_order;
const delete_order_by_id = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const valid = (0, validates_1.validation_id)(id);
        if (!valid.error) {
            const order = yield (0, order_repository_1.find_one_order)(id);
            if (order === null || order === void 0 ? void 0 : order.success) {
                const date_of_order = (_a = order === null || order === void 0 ? void 0 : order.data) === null || _a === void 0 ? void 0 : _a.date;
                if (date_of_order != undefined) {
                    const orderDate = new Date(date_of_order);
                    const currentDate = new Date();
                    if (orderDate.getTime() > currentDate.getTime()) {
                        const result = yield (0, order_repository_1.delete_order)(id);
                        if (result === null || result === void 0 ? void 0 : result.success) {
                            return {
                                success: true,
                                message: result === null || result === void 0 ? void 0 : result.message,
                            };
                        }
                        else {
                            return {
                                success: false,
                                message: result === null || result === void 0 ? void 0 : result.message,
                            };
                        }
                    }
                    else {
                        return {
                            success: false,
                            message: 'order delete failed because it was confirmed',
                        };
                    }
                }
                else {
                    return {
                        success: false,
                        message: 'order delete failed',
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: 'order not avaliable',
                };
            }
        }
        else {
            return {
                success: false,
                message: 'id not valid delete',
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
exports.delete_order_by_id = delete_order_by_id;
const search_order_user = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, validates_1.validation_id)(id.user_id);
        if (!valid.error) {
            const orders = yield (0, order_repository_1.search_order_for_user_in_month)(id);
            if (orders === null || orders === void 0 ? void 0 : orders.success) {
                return {
                    success: true,
                    data: orders === null || orders === void 0 ? void 0 : orders.data,
                };
            }
            else {
                return {
                    success: false,
                    message: orders === null || orders === void 0 ? void 0 : orders.message,
                };
            }
        }
        else {
            return {
                success: false,
                message: 'Id not valid search',
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
exports.search_order_user = search_order_user;
