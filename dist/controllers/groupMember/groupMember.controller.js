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
exports.find_group_member_of_user_controller = void 0;
const useCases_1 = require("../../useCases");
const find_group_member_of_user_controller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, useCases_1.get_group_member_of_user_use)(id);
});
exports.find_group_member_of_user_controller = find_group_member_of_user_controller;
