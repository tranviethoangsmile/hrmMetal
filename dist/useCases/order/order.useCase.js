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
exports.get_all_orders_of_position_in_date_for_admin_use = exports.checkin_picked_usecase = exports.search_order_user_usecase = exports.delete_order_by_id_usecase = exports.search_order_usecase = exports.find_all_order_usecase = exports.create_order_usecase = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const validates_1 = require("../../validates");
const validates_2 = require("../../validates");
const enum_1 = require("../../enum");
const index_1 = require("../index");
const repositorys_1 = require("../../repositorys");
const helpers_1 = require("../../helpers");
const userRepository = new repositorys_1.UserRepository();
const orderRepository = new repositorys_1.OrderRepository();
const create_order_usecase = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const valid = (0, validates_2.validate_create_order)(order);
        if (valid.error) {
            throw new Error(`${valid === null || valid === void 0 ? void 0 : valid.error.message}`);
        }
        const user = yield userRepository.userFindById(order.user_id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        if (!(0, helpers_1.isValidEnumValue)(order.dayOrNight, enum_1.shift_work)) {
            throw new Error('shift work not valid');
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
            const notification = yield (0, index_1.create_notification_usecase)(field_notification);
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
exports.create_order_usecase = create_order_usecase;
const find_all_order_usecase = () => __awaiter(void 0, void 0, void 0, function* () {
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
exports.find_all_order_usecase = find_all_order_usecase;
const search_order_usecase = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, validates_2.validate_search_order)(order);
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
exports.search_order_usecase = search_order_usecase;
const delete_order_by_id_usecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.delete_order_by_id_usecase = delete_order_by_id_usecase;
const search_order_user_usecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.search_order_user_usecase = search_order_user_usecase;
const checkin_picked_usecase = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, validates_2.validate_checkin_picked_order)(field);
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
            const notification = yield (0, index_1.create_notification_usecase)(field_notification);
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
exports.checkin_picked_usecase = checkin_picked_usecase;
const get_all_orders_of_position_in_date_for_admin_use = (position, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, helpers_1.isValidEnumValue)(position, enum_1.Position)) {
            throw new Error(`Position is not valid: ${position}`);
        }
        const formattedDate = (0, moment_timezone_1.default)(date).format('YYYY-MM-DD');
        if (formattedDate !== date) {
            throw new Error(`Date is not valid: ${date}`);
        }
        const orders = yield orderRepository.GET_ALL_ORDERS_OF_POSITION_IN_DATE_FOR_ADMIN(position, date);
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
exports.get_all_orders_of_position_in_date_for_admin_use = get_all_orders_of_position_in_date_for_admin_use;
