"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRouter = express_1.default.Router();
const version_1 = __importDefault(require("./version"));
apiRouter.use('/version', version_1.default);
exports.default = apiRouter;
