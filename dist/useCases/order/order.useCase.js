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
exports.checkin_picked = exports.search_order_user = exports.delete_order_by_id = exports.search_order = exports.find_all = exports.create_order = void 0;
const validates_1 = require("../../validates");
const order_validate_1 = require("../../validates/order/order.validate");
const notification_usecase_1 = require("../notification/notification.usecase");
const repositorys_1 = require("../../repositorys");
const userRepository = new repositorys_1.UserRepository();
const orderRepository = new repositorys_1.OrderRepository();
const create_order = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const valid = (0, order_validate_1.validate_create_order)(order);
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const user = yield userRepository.userFindById(order.user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        const created_order = yield orderRepository.create(order);
        if (!(created_order === null || created_order === void 0 ? void 0 : created_order.success)) {
            throw new Error(`${created_order === null || created_order === void 0 ? void 0 : created_order.message}`);
        }
        try {
            const field_notification = {
                title: 'Order',
                user_id: (_a = created_order === null || created_order === void 0 ? void 0 : created_order.data) === null || _a === void 0 ? void 0 : _a.user_id,
                type: 'SUCCESS',
                message: 'Order success',
            };
            const notification = yield (0, notification_usecase_1.create_notification_usecase)(field_notification);
            if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                throw new Error(notification === null || notification === void 0 ? void 0 : notification.message);
            }
        }
        catch (error) {
            console.log(`notification: ${error === null || error === void 0 ? void 0 : error.message}`);
        }
        return {
            success: true,
            data: created_order === null || created_order === void 0 ? void 0 : created_order.data,
        };
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
        const orders = yield orderRepository.find_all_order();
        if (!(orders === null || orders === void 0 ? void 0 : orders.success)) {
            throw new Error(`${orders === null || orders === void 0 ? void 0 : orders.message}`);
        }
        return {
            success: true,
            data: orders === null || orders === void 0 ? void 0 : orders.data,
        };
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
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const orders = yield orderRepository.find_order(order);
        if (!orders.success) {
            throw new Error(`${orders === null || orders === void 0 ? void 0 : orders.message}`);
        }
        return {
            success: true,
            data: orders === null || orders === void 0 ? void 0 : orders.data,
        };
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
    var _b;
    try {
        const valid = (0, validates_1.validation_id)(id);
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const order = yield orderRepository.find_one_order(id);
        if (!(order === null || order === void 0 ? void 0 : order.success)) {
            throw new Error(`${order === null || order === void 0 ? void 0 : order.message}`);
        }
        const date_of_order = (_b = order === null || order === void 0 ? void 0 : order.data) === null || _b === void 0 ? void 0 : _b.date;
        if (date_of_order == undefined) {
            throw new Error('order delete failed');
        }
        const orderDate = new Date(date_of_order);
        const currentDate = new Date();
        if (orderDate.getTime() < currentDate.getTime()) {
            throw new Error('order delete failed because it was confirmed');
        }
        const result = yield orderRepository.delete_order(id);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(`${result === null || result === void 0 ? void 0 : result.message}`);
        }
        return {
            success: true,
            message: result === null || result === void 0 ? void 0 : result.message,
        };
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
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const orders = yield orderRepository.search_order_for_user_in_month(id);
        if (!(orders === null || orders === void 0 ? void 0 : orders.success)) {
            throw new Error(`${orders === null || orders === void 0 ? void 0 : orders.message}`);
        }
        return {
            success: true,
            data: orders === null || orders === void 0 ? void 0 : orders.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.search_order_user = search_order_user;
const checkin_picked = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, order_validate_1.validate_checkin_picked_order)(field);
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const order = yield orderRepository.find_order(field);
        if (!(order === null || order === void 0 ? void 0 : order.success)) {
            throw new Error(`${order === null || order === void 0 ? void 0 : order.message}`);
        }
        const picked_order = yield orderRepository.checkin_picked_order(field);
        if (!picked_order.success) {
            throw new Error(`${picked_order === null || picked_order === void 0 ? void 0 : picked_order.message}`);
        }
        try {
            const field_notification = {
                title: 'Order picked',
                user_id: field.user_id,
                type: 'SUCCESS',
                message: 'Order picked success',
            };
            const notification = yield (0, notification_usecase_1.create_notification_usecase)(field_notification);
            if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                throw new Error(notification === null || notification === void 0 ? void 0 : notification.message);
            }
        }
        catch (error) {
            console.log(`notification: ${error === null || error === void 0 ? void 0 : error.message}`);
        }
        return {
            success: picked_order === null || picked_order === void 0 ? void 0 : picked_order.success,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.checkin_picked = checkin_picked;
