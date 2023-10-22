"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.init = void 0;
const socket_io_1 = require("socket.io");
let io;
exports.io = io;
const init = (server) => {
    exports.io = io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        console.log('New client connected');
        // Xử lý các sự kiện và gửi thông điệp đến client
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
exports.init = init;
