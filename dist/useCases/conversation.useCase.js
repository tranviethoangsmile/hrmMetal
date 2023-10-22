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
exports.create = void 0;
const conversation_repo_1 = require("../repositorys/conversation.repo");
const groupMember_useCase_1 = require("./groupMember.useCase");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const group_of_sender_id = yield (0, groupMember_useCase_1.find_group_of_member)({
            user_id: data.sender_id,
        });
        if (!(group_of_sender_id === null || group_of_sender_id === void 0 ? void 0 : group_of_sender_id.success)) {
            const new_conversation = yield (0, conversation_repo_1.create_conversation)(data);
            if (new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.success) {
                const newgroup1 = yield (0, groupMember_useCase_1.create_groupMember)({
                    user_id: data.sender_id,
                    conversation_id: (_a = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _a === void 0 ? void 0 : _a.id,
                });
                if (newgroup1 === null || newgroup1 === void 0 ? void 0 : newgroup1.success) {
                    const newgroup2 = yield (0, groupMember_useCase_1.create_groupMember)({
                        user_id: data.receiver_id,
                        conversation_id: (_b = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _b === void 0 ? void 0 : _b.id,
                    });
                    if (newgroup2 === null || newgroup2 === void 0 ? void 0 : newgroup2.success) {
                        return {
                            success: true,
                            data: {
                                conversation_id: (_c = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _c === void 0 ? void 0 : _c.id,
                            },
                        };
                    }
                    else {
                        return {
                            success: false,
                            message: newgroup2 === null || newgroup2 === void 0 ? void 0 : newgroup2.message,
                        };
                    }
                }
                else {
                    return {
                        success: false,
                        message: newgroup1 === null || newgroup1 === void 0 ? void 0 : newgroup1.message,
                    };
                }
            }
        }
        else {
            const group_of_receiver_id = yield (0, groupMember_useCase_1.find_group_of_member)({
                user_id: data.receiver_id,
            });
            if (group_of_receiver_id === null || group_of_receiver_id === void 0 ? void 0 : group_of_receiver_id.success) {
                for (const group_sender of group_of_sender_id === null || group_of_sender_id === void 0 ? void 0 : group_of_sender_id.data) {
                    for (const group_receiver of group_of_receiver_id === null || group_of_receiver_id === void 0 ? void 0 : group_of_receiver_id.data) {
                        if (group_sender.conversation_id &&
                            group_sender.conversation_id ===
                                group_receiver.conversation_id) {
                            return {
                                success: true,
                                data: {
                                    conversation_id: group_receiver.conversation_id,
                                },
                            };
                        }
                    }
                }
            }
            const new_conversation = yield (0, conversation_repo_1.create_conversation)(data);
            if (new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.success) {
                const newgroup1 = yield (0, groupMember_useCase_1.create_groupMember)({
                    user_id: data.sender_id,
                    conversation_id: (_d = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _d === void 0 ? void 0 : _d.id,
                });
                if (newgroup1 === null || newgroup1 === void 0 ? void 0 : newgroup1.success) {
                    const newgroup2 = yield (0, groupMember_useCase_1.create_groupMember)({
                        user_id: data.receiver_id,
                        conversation_id: (_e = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _e === void 0 ? void 0 : _e.id,
                    });
                    if (newgroup2 === null || newgroup2 === void 0 ? void 0 : newgroup2.success) {
                        return {
                            success: true,
                            data: {
                                conversation_id: (_f = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _f === void 0 ? void 0 : _f.id,
                            },
                        };
                    }
                    else {
                        return {
                            success: false,
                            message: newgroup2 === null || newgroup2 === void 0 ? void 0 : newgroup2.message,
                        };
                    }
                }
                else {
                    return {
                        success: false,
                        message: newgroup1 === null || newgroup1 === void 0 ? void 0 : newgroup1.message,
                    };
                }
            }
        }
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.create = create;
