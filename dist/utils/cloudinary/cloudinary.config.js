"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ENV = process.env;
cloudinary_1.default.v2.config({
    cloud_name: ENV.CLOUD_DINARY_NAME,
    api_key: ENV.API_KEY_CLOUD_DINARY,
    api_secret: ENV.API_SECRET_CLOUD_DINARY,
});
exports.default = cloudinary_1.default;
