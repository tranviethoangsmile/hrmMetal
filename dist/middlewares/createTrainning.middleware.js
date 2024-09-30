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
exports.create_media_path = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const ENV = process.env;
cloudinary_1.default.v2.config({
    cloud_name: ENV.CLOUD_DINARY_NAME,
    api_key: ENV.API_KEY_CLOUD_DINARY,
    api_secret: ENV.API_SECRET_CLOUD_DINARY,
});
const create_media_path = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            return next();
        }
        const result = yield cloudinary_1.default.v2.uploader.upload(file.path, {
            resource_type: 'auto', // Adjust resource_type if needed
        });
        if (!result || !result.secure_url) {
            return res
                .status(400)
                .json({ success: false, message: 'Failed to upload media' });
        }
        fs_1.default.unlink(file.path, err => {
            if (err)
                console.error('Failed to delete file:', err);
            else
                console.log('File deleted successfully');
        });
        req.body.media_url = result.secure_url;
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message,
        });
    }
});
exports.create_media_path = create_media_path;
