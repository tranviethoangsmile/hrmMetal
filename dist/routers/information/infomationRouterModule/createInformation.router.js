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
// import { create_media_path } from '../../../middlewares/createTrainning.middleware';
const middlewares_1 = require("../../../middlewares");
const helpers_1 = require("../../../helpers");
const createInformationRouter = (0, express_1.Router)();
createInformationRouter.post('/', middlewares_1.create_media_path, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { media_path } = _a, rest = __rest(_a, ["media_path"]);
        let value = Object.assign({}, rest);
        if (media_path) {
            value.media = media_path;
        }
        const information = yield (0, information_controller_1.create_information_controller)(value);
        if (information === null || information === void 0 ? void 0 : information.success) {
            return (0, helpers_1.successResponse)(res, 201, information === null || information === void 0 ? void 0 : information.data);
        }
        else {
            return (0, helpers_1.errorResponse)(res, 400, (information === null || information === void 0 ? void 0 : information.message) || 'Failed to create information');
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createInformationRouter;
