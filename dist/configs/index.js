"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = exports.config = void 0;
const config_1 = __importDefault(require("./config"));
exports.config = config_1.default;
const redis_1 = __importDefault(require("./redis"));
exports.redisConfig = redis_1.default;
