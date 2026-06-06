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
exports.delete_information_by_id_controller = exports.search_all_information_with_field_controller = exports.search_information_by_id_controller = exports.search_information_user_controller = exports.create_information_controller = void 0;
const information_use_1 = require("../../useCases/information/information.use");
const create_information_controller = (value) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, information_use_1.create_information_use)(value);
});
exports.create_information_controller = create_information_controller;
const search_information_user_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, information_use_1.search_information_of_user_use)(id);
});
exports.search_information_user_controller = search_information_user_controller;
const search_information_by_id_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, information_use_1.search_information_by_id_use)(id);
});
exports.search_information_by_id_controller = search_information_by_id_controller;
const search_all_information_with_field_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, information_use_1.search_all_information_with_field_use)(field);
});
exports.search_all_information_with_field_controller = search_all_information_with_field_controller;
const delete_information_by_id_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, information_use_1.delete_information_by_id_use)(id);
});
exports.delete_information_by_id_controller = delete_information_by_id_controller;
