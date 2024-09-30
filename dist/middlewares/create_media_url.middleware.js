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
const cloudinary_config_1 = __importDefault(require("../utils/cloudinary/cloudinary.config"));
const fs_1 = __importDefault(require("fs"));
const create_media_path = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const urlMedias = [];
        const uploadPromises = files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield cloudinary_config_1.default.v2.uploader.upload(file.path, {
                resource_type: 'auto',
            });
            fs_1.default.unlink(file.path, () => {
                console.log('deleted path');
            });
            return result;
        }));
        Promise.all(uploadPromises)
            .then(results => {
            const urls = results.map(result => result.secure_url);
            urlMedias.push(urls);
            req.body.media_path = urlMedias;
            next();
        })
            .catch(error => {
            res.status(203).json({
                success: false,
                message: error === null || error === void 0 ? void 0 : error.message,
            });
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error.mesage,
        });
    }
});
exports.create_media_path = create_media_path;
