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
exports.find_group_member = exports.create_group_member = void 0;
const models_1 = require("../models");
const create_group_member = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group_member = yield models_1.GroupMember.create(Object.assign({}, data));
        if (group_member != null) {
            return {
                success: true,
                data: group_member,
            };
        }
        else {
            return {
                success: false,
                message: 'create groupMember failed',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.create_group_member = create_group_member;
const find_group_member = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group_member = yield models_1.GroupMember.findAll({
            where: Object.assign({}, data),
        });
        if (group_member.length > 0) {
            return {
                success: true,
                data: group_member,
            };
        }
        else {
            return {
                success: false,
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.find_group_member = find_group_member;
