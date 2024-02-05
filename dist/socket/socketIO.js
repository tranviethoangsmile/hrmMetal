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
exports.io = exports.init = void 0;
const socket_io_1 = require("socket.io");
const handleMessage_1 = require("../utils/handleMessage");
let io;
exports.io = io;
const init = (server) => {
    exports.io = io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        console.log('New client connected');
        // Xử lý các sự kiện và gửi thông điệp đến client
        socket.on('sendMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const respon = yield (0, handleMessage_1.handleMessage)(data);
            if (respon === null || respon === void 0 ? void 0 : respon.success) {
                // for (let i = 0; i < respon?.message.length; i++) {
                // setTimeout(() => {
                socket.emit('messgpt', respon.message);
                //         }, 5 * i);
                //     }
            }
        }));
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
exports.init = init;
