"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./routers"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const http_1 = __importDefault(require("http"));
const socketIO_1 = require("./socket/socketIO");
const config_system_1 = __importDefault(require("./configs/config.system"));
require('./dbs/db.mongo');
dotenv_1.default.config();
const PORT = config_system_1.default.app.port || 4000;
const HOSTNAME = '192.168.0.108';
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
(0, socketIO_1.init)(server);
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(express_1.default.static('public'));
app.use(routers_1.default);
server.listen(PORT, () => {
    console.warn(`server runing on port ${PORT}`);
});
process.on('SIGINT', () => {
    server.close(() => {
        console.warn(`server closed`);
    });
});
