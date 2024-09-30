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
exports.get_checkin_detail_in_date_of_user_controller = exports.get_checkin_in_date_of_position_controller = exports.search_checked_of_user_in_month_controller = exports.is_checked_controller = exports.update_checkin_controller = exports.create_checkin_controller = void 0;
const checkin_useCase_1 = require("../../useCases/checkin/checkin.useCase");
const create_checkin_controller = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, checkin_useCase_1.create_checkin_use)(data);
});
exports.create_checkin_controller = create_checkin_controller;
const update_checkin_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, checkin_useCase_1.update_checkin_use)(field);
});
exports.update_checkin_controller = update_checkin_controller;
const is_checked_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, checkin_useCase_1.is_checked)(field);
});
exports.is_checked_controller = is_checked_controller;
const search_checked_of_user_in_month_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, checkin_useCase_1.search_checkin_of_user_in_month_useCase)(field);
});
exports.search_checked_of_user_in_month_controller = search_checked_of_user_in_month_controller;
const get_checkin_in_date_of_position_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, checkin_useCase_1.get_checkin_of_position_in_date_use)(field);
});
exports.get_checkin_in_date_of_position_controller = get_checkin_in_date_of_position_controller;
const get_checkin_detail_in_date_of_user_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, checkin_useCase_1.get_checkin_detail_in_date_of_user_use)(field);
});
exports.get_checkin_detail_in_date_of_user_controller = get_checkin_detail_in_date_of_user_controller;
