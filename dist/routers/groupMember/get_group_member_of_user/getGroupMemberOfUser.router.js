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
const express_1 = require("express");
const controllers_1 = require("../../../controllers");
const validates_1 = require("../../../validates");
const helpers_1 = require("../../../helpers");
const getGroupMemberRouter = (0, express_1.Router)();
getGroupMemberRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = req.body.user_id;
        if (typeof user_id !== 'string') {
            return (0, helpers_1.errorResponse)(res, 400, 'Invalid user_id');
        }
        const isValid = (0, validates_1.validation_id)(user_id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            return (0, helpers_1.errorResponse)(res, 400, ((_a = isValid === null || isValid === void 0 ? void 0 : isValid.error) === null || _a === void 0 ? void 0 : _a.message) || 'Invalid user_id');
        }
        const group_members = yield (0, controllers_1.find_group_member_of_user_controller)(user_id);
        if (!(group_members === null || group_members === void 0 ? void 0 : group_members.success)) {
            return (0, helpers_1.errorResponse)(res, 400, (group_members === null || group_members === void 0 ? void 0 : group_members.message) || 'Failed to get group members');
        }
        return (0, helpers_1.successResponse)(res, 200, group_members === null || group_members === void 0 ? void 0 : group_members.data);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = getGroupMemberRouter;
