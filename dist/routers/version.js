"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const versionRouter = express_1.default.Router();
const v1_1 = __importDefault(require("./v1"));
versionRouter.use('/v1', v1_1.default);
exports.default = versionRouter;
