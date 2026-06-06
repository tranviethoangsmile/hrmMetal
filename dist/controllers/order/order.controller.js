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
exports.get_all_orders_of_position_in_date_for_admin_controller = exports.check_picked_order = exports.search_order_of_user = exports.delete_order = exports.search_orders = exports.find_all_order = exports.create_order_controller = void 0;
const useCases_1 = require("../../useCases");
const create_order_controller = (order) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.create_order_usecase)(order);
});
exports.create_order_controller = create_order_controller;
const find_all_order = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.find_all_order_usecase)();
});
exports.find_all_order = find_all_order;
const search_orders = (order) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.search_order_usecase)(order);
});
exports.search_orders = search_orders;
const delete_order = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.delete_order_by_id_usecase)(id);
});
exports.delete_order = delete_order;
const search_order_of_user = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.search_order_user_usecase)(id);
});
exports.search_order_of_user = search_order_of_user;
const check_picked_order = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.checkin_picked_usecase)(field);
});
exports.check_picked_order = check_picked_order;
const get_all_orders_of_position_in_date_for_admin_controller = (position, date) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.get_all_orders_of_position_in_date_for_admin_use)(position, date);
});
exports.get_all_orders_of_position_in_date_for_admin_controller = get_all_orders_of_position_in_date_for_admin_controller;
