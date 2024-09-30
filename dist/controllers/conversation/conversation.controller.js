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
exports.delete_conversation_controller = exports.create_conversation_controller = void 0;
const useCases_1 = require("../../useCases");
const create_conversation_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.create_conversation_use)(field);
});
exports.create_conversation_controller = create_conversation_controller;
const delete_conversation_controller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, useCases_1.create_delete_conversation_use)(field);
});
exports.delete_conversation_controller = delete_conversation_controller;
