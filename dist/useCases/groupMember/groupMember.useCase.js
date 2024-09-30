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
exports.find_user_by_conversation_id_use = exports.get_group_member_of_user_use = exports.create_groupMember = exports.find_group_of_member = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const repositorys_1 = require("../../repositorys");
const enum_1 = require("../../enum");
const groupMemberRepo = new repositorys_1.GroupMemberRepository();
const get_group_member_of_user_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupMembersData = yield groupMemberRepo.find_group_member_of_user(id);
        if (!(groupMembersData === null || groupMembersData === void 0 ? void 0 : groupMembersData.success)) {
            throw new Error(`${groupMembersData === null || groupMembersData === void 0 ? void 0 : groupMembersData.message}`);
        }
        return {
            success: true,
            data: groupMembersData === null || groupMembersData === void 0 ? void 0 : groupMembersData.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.get_group_member_of_user_use = get_group_member_of_user_use;
const find_group_of_member = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupMembersData = yield groupMemberRepo.find_group_member(id);
        if (!(groupMembersData === null || groupMembersData === void 0 ? void 0 : groupMembersData.success)) {
            throw new Error(`${groupMembersData === null || groupMembersData === void 0 ? void 0 : groupMembersData.message}`);
        }
        return {
            success: true,
            data: groupMembersData === null || groupMembersData === void 0 ? void 0 : groupMembersData.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.find_group_of_member = find_group_of_member;
const create_groupMember = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data || !data.conversation_id || !data.role || !data.user_id) {
            throw new Error('Invalid data create group member');
        }
        if (!Object.values(enum_1.groupMemberRole).includes(data.role)) {
            throw new Error('Invalid role');
        }
        const date = (0, moment_timezone_1.default)().tz('Asia/Tokyo');
        const new_group = yield groupMemberRepo.create_group_member(Object.assign(Object.assign({}, data), { joined_at: date.format('YYYY-MM-DD HH:mm:ss') }));
        if (!(new_group === null || new_group === void 0 ? void 0 : new_group.success)) {
            throw new Error(`${new_group === null || new_group === void 0 ? void 0 : new_group.message}`);
        }
        return {
            success: true,
            data: new_group === null || new_group === void 0 ? void 0 : new_group.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.create_groupMember = create_groupMember;
const find_user_by_conversation_id_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield groupMemberRepo.find_user_by_conversation_id(id);
        if (!(users === null || users === void 0 ? void 0 : users.success)) {
            throw new Error(`${users === null || users === void 0 ? void 0 : users.message}`);
        }
        return {
            success: true,
            data: users === null || users === void 0 ? void 0 : users.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.find_user_by_conversation_id_use = find_user_by_conversation_id_use;
