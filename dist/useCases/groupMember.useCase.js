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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_groupMember = exports.find_group_of_member = void 0;
const groupMember_repo_1 = require("../repositorys/groupMember.repo");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const find_group_of_member = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupMembersData = yield (0, groupMember_repo_1.find_group_member)(Object.assign({}, data));
        if (groupMembersData === null || groupMembersData === void 0 ? void 0 : groupMembersData.success) {
            return {
                success: true,
                data: groupMembersData === null || groupMembersData === void 0 ? void 0 : groupMembersData.data,
            };
        }
        else {
            return {
                success: false,
                message: groupMembersData === null || groupMembersData === void 0 ? void 0 : groupMembersData.message,
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error.messgae,
        };
    }
});
exports.find_group_of_member = find_group_of_member;
const create_groupMember = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = (0, moment_timezone_1.default)().tz('Asia/Ho_Chi_Minh');
        const new_group = yield (0, groupMember_repo_1.create_group_member)(Object.assign(Object.assign({}, data), { joined_datetime: date.format('YYYY-MM-DD HH:mm:ss') }));
        if (new_group === null || new_group === void 0 ? void 0 : new_group.success) {
            return {
                success: new_group === null || new_group === void 0 ? void 0 : new_group.success,
                data: new_group === null || new_group === void 0 ? void 0 : new_group.data,
            };
        }
        else {
            return {
                success: new_group === null || new_group === void 0 ? void 0 : new_group.success,
                message: new_group === null || new_group === void 0 ? void 0 : new_group.message,
            };
        }
    }
    catch (error) {
        return {
            success: false,
            message: error.messgae,
        };
    }
});
exports.create_groupMember = create_groupMember;
