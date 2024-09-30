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
const cloudinary_config_1 = __importDefault(require("../utils/cloudinary/cloudinary.config"));
const information_controller_1 = require("../controllers/information/information.controller");
const cloudinary_build_url_1 = require("cloudinary-build-url");
const delete_media_url = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.body.id;
        if (!id) {
            res.status(400).json({
                success: false,
                message: 'value not valid',
            });
        }
        else {
            const information = yield (0, information_controller_1.search_information_by_id_controller)(id);
            if (information === null || information === void 0 ? void 0 : information.success) {
                const publicId = (0, cloudinary_build_url_1.extractPublicId)(`${(_a = information === null || information === void 0 ? void 0 : information.data) === null || _a === void 0 ? void 0 : _a.media}`);
                if (publicId) {
                    const result = yield cloudinary_config_1.default.v2.uploader.destroy(publicId);
                    if (result.result === 'ok') {
                        return next();
                    }
                    else {
                        res.status(200).json({
                            success: false,
                            message: 'deleted not success',
                        });
                    }
                }
                else {
                    return next();
                }
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error: ' + error.mesage,
        });
    }
});
exports.default = delete_media_url;
