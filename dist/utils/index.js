"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delCache = exports.getCache = exports.setCache = exports.sendPushNotification = void 0;
const handlePushNotification_1 = __importDefault(require("./pushNotification/handlePushNotification"));
exports.sendPushNotification = handlePushNotification_1.default;
const redis_cache_1 = require("./redis/redis.cache");
Object.defineProperty(exports, "setCache", { enumerable: true, get: function () { return redis_cache_1.setCache; } });
Object.defineProperty(exports, "getCache", { enumerable: true, get: function () { return redis_cache_1.getCache; } });
Object.defineProperty(exports, "delCache", { enumerable: true, get: function () { return redis_cache_1.delCache; } });
