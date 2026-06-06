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
exports.update_uniform_order_controller = exports.get_uniform_order_detail_by_id_controller = exports.delete_uniform_order_with_id_controller = exports.search_uniform_order_with_user_id_controller = exports.search_uniform_order_with_position_controller = exports.create_uniform_order_controller = void 0;
const useCases_1 = require("../../useCases");
const create_uniform_order_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.create_uniform_order_use)(field);
});
exports.create_uniform_order_controller = create_uniform_order_controller;
const search_uniform_order_with_position_controller = (position) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.search_uniform_order_with_position_use)(position);
});
exports.search_uniform_order_with_position_controller = search_uniform_order_with_position_controller;
const search_uniform_order_with_user_id_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.search_uniform_order_with_user_id_use)(field);
});
exports.search_uniform_order_with_user_id_controller = search_uniform_order_with_user_id_controller;
const delete_uniform_order_with_id_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.delete_uniform_order_with_id_use)(id);
});
exports.delete_uniform_order_with_id_controller = delete_uniform_order_with_id_controller;
const get_uniform_order_detail_by_id_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.get_uniform_order_detail_by_id_use)(id);
});
exports.get_uniform_order_detail_by_id_controller = get_uniform_order_detail_by_id_controller;
const update_uniform_order_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.update_uniform_order_use)(field);
});
exports.update_uniform_order_controller = update_uniform_order_controller;
