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
exports.update_day_off_by_id_controller = exports.delete_day_off_by_id_controller = exports.get_day_off_by_id_controller = exports.get_all_day_off_controller = exports.create_day_off_controller = void 0;
const useCases_1 = require("../../useCases");
const create_day_off_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.create_day_off_use)(field);
});
exports.create_day_off_controller = create_day_off_controller;
const get_all_day_off_controller = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.get_all_day_off_use)();
});
exports.get_all_day_off_controller = get_all_day_off_controller;
const get_day_off_by_id_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.get_day_off_by_id_use)(id);
});
exports.get_day_off_by_id_controller = get_day_off_by_id_controller;
const delete_day_off_by_id_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.delete_day_off_by_id_use)(id);
});
exports.delete_day_off_by_id_controller = delete_day_off_by_id_controller;
const update_day_off_by_id_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.update_day_off_by_id_use)(field);
});
exports.update_day_off_by_id_controller = update_day_off_by_id_controller;
