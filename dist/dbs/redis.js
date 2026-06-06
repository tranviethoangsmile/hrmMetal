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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeRedis = exports.getRedis = exports.initRedis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const configs_1 = require("../configs");
const statusConnectRedis = {
    CONNECTED: 'connect',
    READY: 'ready',
    RECONNECTING: 'reconnecting',
    ERROR: 'error',
    END: 'end',
};
let listenersAttached = false;
const redis = new ioredis_1.default({
    host: configs_1.redisConfig.host,
    port: configs_1.redisConfig.port,
    password: configs_1.redisConfig.password,
    maxRetriesPerRequest: configs_1.redisConfig.maxRetriesPerRequest,
    connectTimeout: configs_1.redisConfig.connectTimeout,
    enableReadyCheck: configs_1.redisConfig.enableReadyCheck,
    maxLoadingRetryTime: configs_1.redisConfig.maxLoadingRetryTime,
});
const attachListeners = () => {
    if (listenersAttached)
        return;
    listenersAttached = true;
    redis.on(statusConnectRedis.CONNECTED, () => {
        console.log('Redis connected');
    });
    redis.on(statusConnectRedis.READY, () => {
        console.log('Redis ready');
        // Kiểm tra replication mode
        redis.info('replication').then(info => {
            const lines = info.split('\n');
            const role = lines.find(line => line.startsWith('role:'));
            console.log('Redis mode:', role);
        }).catch(err => {
            console.error('Failed to get Redis info:', err);
        });
    });
    redis.on(statusConnectRedis.RECONNECTING, () => {
        console.log('Redis reconnecting');
    });
    redis.on(statusConnectRedis.ERROR, err => {
        console.error('Redis error:', err);
    });
    redis.on(statusConnectRedis.END, () => {
        console.warn('Redis connection ended');
    });
};
const initRedis = () => {
    attachListeners();
    return redis;
};
exports.initRedis = initRedis;
const getRedis = () => redis;
exports.getRedis = getRedis;
const closeRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redis.quit();
    }
    catch (e) {
        // ignore
    }
});
exports.closeRedis = closeRedis;
attachListeners();
exports.default = redis;
