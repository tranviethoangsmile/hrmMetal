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
class FcmTokenRepository {
    create(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fcmToken = yield models_1.FcmToken.create(Object.assign({}, field));
                if (fcmToken === null) {
                    throw new Error(`create fcmtoken not successfully`);
                }
                return {
                    success: true,
                    data: fcmToken,
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
    find_fcm_token_of_user(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fcmToken = yield models_1.FcmToken.findOne({
                    where: {
                        user_id: id,
                    },
                    attributes: ['fcm_token'],
                });
                if (!fcmToken) {
                    throw new Error(`FCM not exist`);
                }
                return {
                    success: true,
                    data: fcmToken,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo -- ${error.message}`,
                };
            }
        });
    }
    destroy_old_fcm_token_of_user(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.FcmToken.destroy({
                    where: {
                        user_id: id,
                    },
                });
                if (result < 1) {
                    throw new Error(`destroy fcm token not successfully`);
                }
                return {
                    success: true,
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
exports.default = FcmTokenRepository;
