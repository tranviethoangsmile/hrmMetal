"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mediaRouter = (0, express_1.Router)();
mediaRouter.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const media_path = '/media/uploads/' + filename;
    res.status(200).sendFile(media_path);
});
exports.default = mediaRouter;
