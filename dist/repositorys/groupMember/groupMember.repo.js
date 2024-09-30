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
const models_1 = require("../../models");
const sequelize_1 = require("sequelize");
class GroupMemberRepository {
    create_group_member(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group_member = yield models_1.GroupMember.create(Object.assign({}, data));
                if (group_member === null) {
                    throw new Error(`create groupMember failed`);
                }
                return {
                    success: true,
                    data: group_member,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    find_group_member(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const group_member = yield models_1.GroupMember.findAll({
                    where: {
                        user_id: id,
                    },
                    attributes: ['conversation_id', 'id', 'joined_at'],
                    include: [
                        {
                            model: models_1.Conversation,
                            as: 'conversation',
                            attributes: ['member_count'],
                        },
                    ],
                });
                if (group_member === null || group_member.length < 1) {
                    throw new Error('group member not found');
                }
                return {
                    success: true,
                    data: group_member,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    find_group_member_of_user(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userConversations = yield models_1.GroupMember.findAll({
                    where: {
                        user_id: id,
                    },
                    attributes: ['conversation_id'],
                });
                const conversationIds = userConversations.map(gm => gm.conversation_id);
                if (conversationIds.length === 0) {
                    throw new Error('User is not part of any conversations.');
                }
                // Bước 2: Lấy tất cả các GroupMember trong các conversation đó, ngoại trừ người dùng hiện tại
                const groupMembers = yield models_1.GroupMember.findAll({
                    where: {
                        conversation_id: {
                            [sequelize_1.Op.in]: conversationIds,
                        },
                        user_id: {
                            [sequelize_1.Op.ne]: id, // Loại trừ người dùng hiện tại
                        },
                    },
                    attributes: ['conversation_id', 'id', 'joined_at'],
                    include: [
                        {
                            model: models_1.Conversation,
                            as: 'conversation',
                            attributes: ['member_count'],
                            include: [
                                {
                                    model: models_1.DeleteConversation,
                                    as: 'delete_conversations',
                                    attributes: ['user_id'],
                                },
                            ],
                        },
                        {
                            model: models_1.User,
                            as: 'users',
                            attributes: ['id', 'name', 'avatar'],
                        },
                    ],
                });
                if (groupMembers.length === 0) {
                    throw new Error('No other group members found.');
                }
                return {
                    success: true,
                    data: groupMembers,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error === null || error === void 0 ? void 0 : error.message,
                };
            }
        });
    }
    find_user_by_conversation_id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.GroupMember.findAll({
                    where: {
                        conversation_id: id,
                    },
                    attributes: ['user_id'],
                });
                if (users === null || users.length < 1) {
                    throw new Error('No user found in the conversation');
                }
                return {
                    success: true,
                    data: users,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo -- ${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
}
exports.default = GroupMemberRepository;
