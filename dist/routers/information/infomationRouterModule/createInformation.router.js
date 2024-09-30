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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const information_controller_1 = require("../../../controllers/information/information.controller");
const createTrainning_middleware_1 = require("../../../middlewares/createTrainning.middleware");
const upload_multer_1 = require("../../../utils/multer/upload.multer");
const createInformationRouter = (0, express_1.Router)();
createInformationRouter.post('/', upload_multer_1.upload.single('media'), createTrainning_middleware_1.create_media_path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { media_url } = _a, rest = __rest(_a, ["media_url"]);
        let value = Object.assign({}, rest);
        if (media_url) {
            value.media = media_url;
        }
        const information = yield (0, information_controller_1.create_information_controller)(value);
        if (information === null || information === void 0 ? void 0 : information.success) {
            return res.status(201).json({
                success: true,
                data: information === null || information === void 0 ? void 0 : information.data,
            });
        }
        else {
            return res.status(200).json({
                success: false,
                message: information === null || information === void 0 ? void 0 : information.message,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = createInformationRouter;
