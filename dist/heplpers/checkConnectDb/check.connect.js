"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.numConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const numConnection = () => {
    const connectCount = mongoose_1.default.connections.length;
    console.log(`connecting ${connectCount}`);
    return connectCount;
};
exports.numConnection = numConnection;
