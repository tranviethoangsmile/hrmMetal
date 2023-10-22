"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mediaRouter = express_1.default.Router();
mediaRouter.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const media_path = '/media/uploads/' + filename;
    res.status(200).sendFile(media_path);
});
exports.default = mediaRouter;
