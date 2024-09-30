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
exports.create_delete_message_cotroller = void 0;
const useCases_1 = require("../../useCases");
const create_delete_message_cotroller = (field) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, useCases_1.create_delete_message_use)(field);
});
exports.create_delete_message_cotroller = create_delete_message_cotroller;
