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
exports.search_notification_of_user_controller = exports.search_notification_controller = exports.destroy_notification_controller = exports.update_notification_controller = exports.create_notification_controller = void 0;
const useCases_1 = require("../../useCases");
const create_notification_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.create_notification_usecase)(field);
});
exports.create_notification_controller = create_notification_controller;
const update_notification_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.update_notification_usecase)(id);
});
exports.update_notification_controller = update_notification_controller;
const destroy_notification_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.destroy_notification_usecase)(id);
});
exports.destroy_notification_controller = destroy_notification_controller;
const search_notification_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.search_notification_usecase)(id);
});
exports.search_notification_controller = search_notification_controller;
const search_notification_of_user_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.search_notification_of_user_usecase)(id);
});
exports.search_notification_of_user_controller = search_notification_of_user_controller;
