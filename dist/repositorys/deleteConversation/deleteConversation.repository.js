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
class DeleteConversationRepository {
    create(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dlConversation = yield models_1.DeleteConversation.create(Object.assign({}, field));
                if (dlConversation === null) {
                    throw new Error('create deleteConversation failed');
                }
                return {
                    success: true,
                    data: dlConversation,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    delete_by_conversation_id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.DeleteConversation.destroy({
                    where: {
                        conversation_id: id,
                    },
                });
                if (result < 1) {
                    throw new Error(`delete not successfully`);
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
    find_by_conversation_id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dlConversation = yield models_1.DeleteConversation.findOne({
                    where: {
                        conversation_id: id,
                    },
                });
                if (dlConversation === null) {
                    throw new Error(`not found`);
                }
                return {
                    success: true,
                    data: dlConversation,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }
        });
    }
}
exports.default = DeleteConversationRepository;
