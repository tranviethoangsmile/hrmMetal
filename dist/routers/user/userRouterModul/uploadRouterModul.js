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
const express_1 = require("express");
const uploadAvatar = (0, express_1.Router)();
const createTrainning_middleware_1 = require("../../../middlewares/createTrainning.middleware");
const user_controller_1 = require("../../../controllers/user/user.controller");
const upload_multer_1 = require("../../../utils/multer/upload.multer");
uploadAvatar.post('/', upload_multer_1.upload.single('avatar'), createTrainning_middleware_1.create_media_path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_field = {
        id: req.body.id,
        avatar: req.body.media_url,
    };
    try {
        const result = yield (0, user_controller_1.update)(user_field);
        if (result === null || result === void 0 ? void 0 : result.success) {
            res.status(201).send({
                success: true,
            });
        }
        else {
            res.status(200).send({
                success: false,
                message: result === null || result === void 0 ? void 0 : result.message,
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'server error: ' + error.mesage,
        });
    }
}));
exports.default = uploadAvatar;
