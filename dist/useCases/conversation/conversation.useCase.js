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
exports.create_conversation_group_use = exports.search_conversation_by_id_use = exports.create_conversation_use = void 0;
const repositorys_1 = require("../../repositorys");
const index_1 = require("../index");
const validates_1 = require("../../validates");
const conversationRepo = new repositorys_1.ConversationRepository();
const create_conversation_group_use = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const isValid = (0, validates_1.validate_create_conversation_group)(data);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`-validate- ${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const sender = yield (0, index_1.findUserById)(data.sender_id);
        if (!(sender === null || sender === void 0 ? void 0 : sender.success)) {
            throw new Error(`${sender === null || sender === void 0 ? void 0 : sender.message}`);
        }
        yield Promise.all(data.receivers.map(({ user_id }) => __awaiter(void 0, void 0, void 0, function* () {
            const receiver = yield (0, index_1.findUserById)(user_id);
            if (!(receiver === null || receiver === void 0 ? void 0 : receiver.success)) {
                throw new Error(`${receiver === null || receiver === void 0 ? void 0 : receiver.message}`);
            }
        })));
        const new_conversation = yield conversationRepo.create_conversation({
            title: data.title,
            member_count: (data === null || data === void 0 ? void 0 : data.receivers.length) + 1,
        });
        if (!(new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.success)) {
            throw new Error(`${new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.message}`);
        }
        const senderOf = yield (0, index_1.create_groupMember)({
            user_id: data.sender_id,
            conversation_id: (_a = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _a === void 0 ? void 0 : _a.id,
            role: 'ADMIN',
            group_type: 'GROUP',
        });
        if (!(senderOf === null || senderOf === void 0 ? void 0 : senderOf.success)) {
            throw new Error(`${senderOf === null || senderOf === void 0 ? void 0 : senderOf.message}`);
        }
        yield Promise.all(data.receivers.map(({ user_id }) => __awaiter(void 0, void 0, void 0, function* () {
            var _c;
            const receiverOf = yield (0, index_1.create_groupMember)({
                user_id: user_id,
                conversation_id: (_c = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _c === void 0 ? void 0 : _c.id,
                role: 'MEMBER',
                group_type: 'GROUP',
            });
            if (!(receiverOf === null || receiverOf === void 0 ? void 0 : receiverOf.success)) {
                throw new Error(`${receiverOf === null || receiverOf === void 0 ? void 0 : receiverOf.message}`);
            }
        })));
        return {
            success: true,
            data: {
                conversation_id: (_b = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _b === void 0 ? void 0 : _b.id,
            },
        };
    }
    catch (error) {
        return {
            success: false,
            message: `--use--${error === null || error === void 0 ? void 0 : error.message}`,
        };
    }
});
exports.create_conversation_group_use = create_conversation_group_use;
const create_conversation_use = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    // const t = await db.transaction();
    try {
        const isValid = (0, validates_1.validate_create_conversation)(data);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(isValid === null || isValid === void 0 ? void 0 : isValid.error.message);
        }
        const sender = yield (0, index_1.findUserById)(data.sender_id);
        if (!(sender === null || sender === void 0 ? void 0 : sender.success)) {
            throw new Error(`${sender === null || sender === void 0 ? void 0 : sender.message}`);
        }
        const receiver = yield (0, index_1.findUserById)(data.receiver_id);
        if (!(receiver === null || receiver === void 0 ? void 0 : receiver.success)) {
            throw new Error(`${receiver === null || receiver === void 0 ? void 0 : receiver.message}`);
        }
        const group_of_sender_id = yield (0, index_1.find_group_of_member)(data.sender_id);
        if (!(group_of_sender_id === null || group_of_sender_id === void 0 ? void 0 : group_of_sender_id.success)) {
            const new_conversation = yield conversationRepo.create_conversation(data);
            if (!(new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.success)) {
                throw new Error(`${new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.message}`);
            }
            const senderOf = yield (0, index_1.create_groupMember)({
                user_id: data.sender_id,
                conversation_id: (_d = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _d === void 0 ? void 0 : _d.id,
                role: 'ADMIN',
                group_type: 'SINGLE',
            });
            if (!(senderOf === null || senderOf === void 0 ? void 0 : senderOf.success)) {
                throw new Error(`${senderOf === null || senderOf === void 0 ? void 0 : senderOf.message}`);
            }
            const receiverOf = yield (0, index_1.create_groupMember)({
                user_id: data.receiver_id,
                conversation_id: (_e = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _e === void 0 ? void 0 : _e.id,
                role: 'MEMBER',
                group_type: 'SINGLE',
            });
            if (!(receiverOf === null || receiverOf === void 0 ? void 0 : receiverOf.success)) {
                throw new Error(`${receiverOf === null || receiverOf === void 0 ? void 0 : receiverOf.message}`);
            }
            // t.commit();
            return {
                success: true,
                data: {
                    conversation_id: (_f = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _f === void 0 ? void 0 : _f.id,
                },
            };
        }
        else {
            const group_of_receiver_id = yield (0, index_1.find_group_of_member)(data.receiver_id);
            if (!(group_of_receiver_id === null || group_of_receiver_id === void 0 ? void 0 : group_of_receiver_id.success)) {
                const new_conversation = yield conversationRepo.create_conversation(data);
                if (!(new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.success)) {
                    throw new Error(`${new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.message}`);
                }
                const senderOf = yield (0, index_1.create_groupMember)({
                    user_id: data.sender_id,
                    conversation_id: (_g = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _g === void 0 ? void 0 : _g.id,
                    role: 'ADMIN',
                    group_type: 'SINGLE',
                });
                if (!(senderOf === null || senderOf === void 0 ? void 0 : senderOf.success)) {
                    throw new Error(`${senderOf === null || senderOf === void 0 ? void 0 : senderOf.message}`);
                }
                const receiverOf = yield (0, index_1.create_groupMember)({
                    user_id: data.receiver_id,
                    conversation_id: (_h = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _h === void 0 ? void 0 : _h.id,
                    role: 'MEMBER',
                    group_type: 'SINGLE',
                });
                if (!(receiverOf === null || receiverOf === void 0 ? void 0 : receiverOf.success)) {
                    throw new Error(`${receiverOf === null || receiverOf === void 0 ? void 0 : receiverOf.message}`);
                }
                // t.commit();
                return {
                    success: true,
                    data: {
                        conversation_id: (_j = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _j === void 0 ? void 0 : _j.id,
                    },
                };
            }
            else {
                const senderConversationIds = new Set(group_of_sender_id.data.map((group) => group.conversation_id));
                const receiverConversationIds = group_of_receiver_id.data.map((group) => group.conversation_id);
                const commonConversationIds = receiverConversationIds.filter((id) => senderConversationIds.has(id));
                for (const conversationId of commonConversationIds) {
                    const members = yield conversationRepo.search_conversation_by_id(conversationId);
                    if (((_k = members === null || members === void 0 ? void 0 : members.data) === null || _k === void 0 ? void 0 : _k.member_count) === 2) {
                        return {
                            success: true,
                            data: {
                                conversation_id: conversationId,
                            },
                        };
                    }
                }
                const new_conversation = yield conversationRepo.create_conversation(data);
                if (!(new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.success)) {
                    throw new Error(`${new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.message}`);
                }
                const senderOf = yield (0, index_1.create_groupMember)({
                    user_id: data.sender_id,
                    conversation_id: (_l = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _l === void 0 ? void 0 : _l.id,
                    role: 'ADMIN',
                    group_type: 'SINGLE',
                });
                if (!(senderOf === null || senderOf === void 0 ? void 0 : senderOf.success)) {
                    throw new Error(`${senderOf === null || senderOf === void 0 ? void 0 : senderOf.message}`);
                }
                const receiverOf = yield (0, index_1.create_groupMember)({
                    user_id: data.receiver_id,
                    conversation_id: (_m = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _m === void 0 ? void 0 : _m.id,
                    role: 'MEMBER',
                    group_type: 'SINGLE',
                });
                if (!(receiverOf === null || receiverOf === void 0 ? void 0 : receiverOf.success)) {
                    throw new Error(`${receiverOf === null || receiverOf === void 0 ? void 0 : receiverOf.message}`);
                }
                // await t.commit();
                return {
                    success: true,
                    data: {
                        conversation_id: (_o = new_conversation === null || new_conversation === void 0 ? void 0 : new_conversation.data) === null || _o === void 0 ? void 0 : _o.id,
                    },
                };
            }
        }
    }
    catch (error) {
        // await t.rollback();
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.create_conversation_use = create_conversation_use;
const search_conversation_by_id_use = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _p;
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${(_p = isValid === null || isValid === void 0 ? void 0 : isValid.error) === null || _p === void 0 ? void 0 : _p.message}`);
        }
        const conversation = yield conversationRepo.search_conversation_by_id(id);
        if (!(conversation === null || conversation === void 0 ? void 0 : conversation.success)) {
            throw new Error(`${conversation === null || conversation === void 0 ? void 0 : conversation.message}`);
        }
        return {
            success: true,
            data: conversation === null || conversation === void 0 ? void 0 : conversation.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    }
});
exports.search_conversation_by_id_use = search_conversation_by_id_use;
