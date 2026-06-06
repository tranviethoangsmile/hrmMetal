"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getGroupMemberOfUser_router_1 = __importDefault(require("./get_group_member_of_user/getGroupMemberOfUser.router"));
const groupMemberRouter = (0, express_1.Router)();
groupMemberRouter.use('/getgroupmemberofuser', getGroupMemberOfUser_router_1.default);
exports.default = groupMemberRouter;
