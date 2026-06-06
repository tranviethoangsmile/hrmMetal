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
class NotificationRepository {
    create_notification_repo(field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield models_1.Notification.create(Object.assign({}, field));
                if (notification === null) {
                    throw new Error('Error creating notification');
                }
                return {
                    success: true,
                    data: notification,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo ${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    update_notification_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.Notification.update({ is_readed: true }, {
                    where: {
                        id: id,
                    },
                });
                if (result[0] !== 1) {
                    throw new Error('Error updating notification');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo ${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    destroy_notification_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.Notification.destroy({
                    where: {
                        id: id,
                    },
                });
                if (result !== 1) {
                    throw new Error('Error deleting notification');
                }
                return {
                    success: true,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo ${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    search_notification_of_user_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield models_1.Notification.findAll({
                    where: {
                        user_id: id,
                        is_readed: false,
                    },
                    attributes: [
                        'id',
                        'type',
                        'title',
                        'message',
                        'is_readed',
                        'created_at',
                    ],
                });
                if (notifications === null || notifications.length < 1) {
                    throw new Error('notifications not available');
                }
                return {
                    success: true,
                    data: notifications,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo ${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
    search_notification_repo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield models_1.Notification.findOne({
                    where: {
                        id: id,
                    },
                    attributes: [
                        'type',
                        'title',
                        'message',
                        'is_readed',
                        'created_at',
                    ],
                });
                if (notification === null) {
                    throw new Error('notification not available');
                }
                return {
                    success: true,
                    data: notification,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: `repo ${error === null || error === void 0 ? void 0 : error.message}`,
                };
            }
        });
    }
}
exports.default = NotificationRepository;
