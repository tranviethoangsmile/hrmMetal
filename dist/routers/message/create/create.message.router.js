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
const middlewares_1 = require("../../../middlewares");
const helpers_1 = require("../../../helpers");
const createMessageRouter = (0, express_1.Router)();
createMessageRouter.post('/', middlewares_1.create_media_path, // Middleware để xử lý upload media
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { media_path } = req.body;
        if (!media_path || media_path.trim() === '') {
            return (0, helpers_1.errorResponse)(res, 400, 'media_path is required');
        }
        return (0, helpers_1.successResponse)(res, 201, media_path);
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createMessageRouter;
