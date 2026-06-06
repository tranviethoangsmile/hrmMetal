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
const config_system_1 = __importDefault(require("./configs/config/config.system"));
const swagger_config_1 = __importDefault(require("./swagger/swagger.config"));
const middlewares_1 = require("./middlewares");
const redis_1 = require("./dbs/redis");
// require('./dbs/db.mongo');
dotenv_1.default.config();
// Khởi tạo Redis connection
(0, redis_1.initRedis)();
const PORT = config_system_1.default.app.port;
const HOSTNAME = process.env.HOST_SERVER || 'localhost';
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
(0, swagger_config_1.default)(app, PORT);
(0, socketIO_1.init)(server);
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
app.use(express_1.default.json({ limit: '100mb' }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static('public'));
app.use(middlewares_1.apiRateLimiter);
app.use(routers_1.default);
(0, redis_1.initRedis)();
server.listen(PORT, () => {
    console.warn(`server runing on port ${HOSTNAME}:${PORT}`);
});
process.title = 'node 4000';
process.on('SIGINT', () => {
    server.close(() => {
        console.warn(`server closed`);
    });
});
