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
exports.unSend_message_with_id_controller = exports.search_all_message_of_conversation_controller = exports.create_message_controller = void 0;
const useCases_1 = require("../../useCases");
const create_message_controller = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.create_new_message)(data);
});
exports.create_message_controller = create_message_controller;
const search_all_message_of_conversation_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.search_all_message_of_conversation_use)(id);
});
exports.search_all_message_of_conversation_controller = search_all_message_of_conversation_controller;
const unSend_message_with_id_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.unSend_message_with_id_use)(id);
});
exports.unSend_message_with_id_controller = unSend_message_with_id_controller;
