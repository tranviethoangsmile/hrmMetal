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
const useCases_1 = require("../../useCases");
const utils_1 = require("../../utils");
class PushNotificationService {
    sendNotificationsToUsers(userIds, title, body, keyDescrypt) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(userIds.map((userId) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const fcm_token = yield (0, useCases_1.find_fcm_token_of_user_use)(userId);
                    if (fcm_token === null || fcm_token === void 0 ? void 0 : fcm_token.success) {
                        const fcmToken = (_a = fcm_token.data) !== null && _a !== void 0 ? _a : '';
                        const key = keyDescrypt;
                        yield (0, utils_1.sendPushNotification)({
                            fcmToken,
                            title,
                            body,
                            key
                        });
                    }
                }
                catch (error) {
                    console.error(`Failed to send notification to user ${userId}: ${error === null || error === void 0 ? void 0 : error.message}`);
                }
            })));
        });
    }
    sendPushNotificationToUser({ fcmToken, title, body, key }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, utils_1.sendPushNotification)({
                    fcmToken,
                    title,
                    body,
                    key
                });
            }
            catch (error) {
                console.error(`Failed to send notification to user ${title}: ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        });
    }
    handlePushNotiForEvent(position) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users;
                if (position === 'COMPORATION') {
                    users = yield (0, useCases_1.findAllUser)();
                }
                else {
                    users = yield (0, useCases_1.userFindAllWithFieldUse)({ position });
                }
                if (users === null || users === void 0 ? void 0 : users.success) {
                    const userIds = (_a = users === null || users === void 0 ? void 0 : users.data) === null || _a === void 0 ? void 0 : _a.map((user) => user.id);
                    const title = `Safety Check Required! from ${position}`;
                    const body = `Please confirm your safety status as soon as possible.`;
                    const key = '';
                    // Gửi thông báo đến danh sách người dùng
                    yield this.sendNotificationsToUsers(userIds, title, body, key);
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `service -- ${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    handlePushNotiForMessage({ fcmToken, title, body, key }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sendPushNotificationToUser({ fcmToken, title, body, key });
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `service -- ${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
}
exports.default = PushNotificationService;
