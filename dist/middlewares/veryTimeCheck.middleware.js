"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const veyrTimeCheck = (req, res, next) => {
    const server_time = (0, moment_1.default)().format('HH:mm');
    const client_time = req.body.check_time;
    if (server_time === client_time) {
        next();
    }
    else {
        return res.status(403).json({
            success: false,
            message: 'time  is not very',
        });
    }
};
exports.default = veyrTimeCheck;
