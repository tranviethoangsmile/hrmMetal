"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const dialect_enum_1 = require("../enum/dialect.enum");
dotenv_1.default.config();
const ENV = process.env;
console.log(ENV.PRO_DB_PASSWORD);
const pro = {
    app: {
        port: parseInt(ENV.PRO_PORT),
    },
    db: {
        host: ENV.PRO_HOST,
        port: parseInt(ENV.PRO_DB_PORT),
        name: ENV.PRO_DB_NAME,
        dialect: dialect_enum_1.Dialect.POSTGRES,
        username: ENV.PRO_DB_USERNAME,
        password: ENV.PRO_DB_PASSWORD,
    },
};
const dev = {
    app: {
        port: parseInt(ENV.DEV_PORT),
    },
    db: {
        host: ENV.DEV_HOST,
        port: parseInt(ENV.DEV_DB_PORT),
        name: ENV.DEV_DB_NAME,
        dialect: dialect_enum_1.Dialect.POSTGRES,
        username: ENV.DEV_DB_USERNAME,
        password: ENV.DEV_DB_PASSWORD,
    },
};
const config = ENV.NODE_ENV === 'dev' ? dev : pro;
exports.default = config;
