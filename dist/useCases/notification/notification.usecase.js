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
exports.search_notification_of_user_usecase = exports.search_notification_usecase = exports.destroy_notification_usecase = exports.update_notification_usecase = exports.create_notification_usecase = void 0;
const enum_1 = require("../../enum");
const validates_1 = require("../../validates");
const user_useCase_1 = require("../user/user.useCase");
const repositorys_1 = require("../../repositorys");
const notificationRepo = new repositorys_1.NotificationRepository();
const create_notification_usecase = (field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validate_create_notification)(field);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        if (!Object.values(enum_1.notification_type).includes(field === null || field === void 0 ? void 0 : field.type)) {
            throw new Error('notification type is not valid');
        }
        const notification = yield notificationRepo.create_notification_repo(Object.assign({}, field));
        if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
            throw new Error(`${notification === null || notification === void 0 ? void 0 : notification.message}`);
        }
        return {
            success: true,
            data: notification,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error.message}`,
        };
    }
});
exports.create_notification_usecase = create_notification_usecase;
const update_notification_usecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const result = yield notificationRepo.update_notification_repo(id);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(`${result === null || result === void 0 ? void 0 : result.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error.message}`,
        };
    }
});
exports.update_notification_usecase = update_notification_usecase;
const destroy_notification_usecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const notification = yield search_notification_usecase(id);
        if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
            throw new Error('notification not found');
        }
        const result = yield notificationRepo.destroy_notification_repo(id);
        if (!(result === null || result === void 0 ? void 0 : result.success)) {
            throw new Error(`${result === null || result === void 0 ? void 0 : result.message}`);
        }
        return {
            success: true,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error.message}`,
        };
    }
});
exports.destroy_notification_usecase = destroy_notification_usecase;
const search_notification_usecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const notification = yield notificationRepo.search_notification_repo(id);
        if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
            throw new Error(`${notification === null || notification === void 0 ? void 0 : notification.message}`);
        }
        return {
            success: true,
            data: notification === null || notification === void 0 ? void 0 : notification.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error.message}`,
        };
    }
});
exports.search_notification_usecase = search_notification_usecase;
const search_notification_of_user_usecase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isValid = (0, validates_1.validation_id)(id);
        if (isValid === null || isValid === void 0 ? void 0 : isValid.error) {
            throw new Error(`${isValid === null || isValid === void 0 ? void 0 : isValid.error.message}`);
        }
        const user = yield (0, user_useCase_1.findUserById)(id);
        if (!(user === null || user === void 0 ? void 0 : user.success)) {
            throw new Error(`${user === null || user === void 0 ? void 0 : user.message}`);
        }
        const notifications = yield notificationRepo.search_notification_of_user_repo(id);
        if (!(notifications === null || notifications === void 0 ? void 0 : notifications.success)) {
            throw new Error(`${notifications === null || notifications === void 0 ? void 0 : notifications.message}`);
        }
        return {
            success: true,
            data: notifications === null || notifications === void 0 ? void 0 : notifications.data,
        };
    }
    catch (error) {
        return {
            success: false,
            message: `use: ${error.message}`,
        };
    }
});
exports.search_notification_of_user_usecase = search_notification_of_user_usecase;
