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
exports.search_order_of_user = exports.delete_order = exports.search_orders = exports.find_all_order = exports.create = void 0;
const order_useCase_1 = require("../useCases/order.useCase");
const create = (order) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, order_useCase_1.create_order)(order);
});
exports.create = create;
const find_all_order = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, order_useCase_1.find_all)();
});
exports.find_all_order = find_all_order;
const search_orders = (order) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, order_useCase_1.search_order)(order);
});
exports.search_orders = search_orders;
const delete_order = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, order_useCase_1.delete_order_by_id)(id);
});
exports.delete_order = delete_order;
const search_order_of_user = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, order_useCase_1.search_order_user)(id);
});
exports.search_order_of_user = search_order_of_user;
