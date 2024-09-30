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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.init = void 0;
const socket_io_1 = require("socket.io");
const moment_1 = __importDefault(require("moment"));
const handleMessageChatAi_1 = require("../utils/AIChat/handleMessageChatAi");
const controllers_1 = require("../controllers");
let io;
exports.io = io;
const init = (server) => {
    exports.io = io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true,
        },
    });
    io.on('connection', (socket) => {
        socket.on('sendMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const respon = yield (0, handleMessageChatAi_1.handleMessage)(data);
            if (respon === null || respon === void 0 ? void 0 : respon.success) {
                socket.emit('messgpt', respon.message);
            }
        }));
        let lastTime = (0, moment_1.default)().format('HH:mm');
        setInterval(() => {
            const currentTime = (0, moment_1.default)().format('HH:mm');
            if (currentTime !== lastTime) {
                lastTime = currentTime;
                socket.emit('qrReset', currentTime);
            }
        }, 1000);
        socket.on('joinConversation', (conversationId) => {
            socket.join(conversationId);
        });
        socket.on('send-message', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const new_messge = yield (0, controllers_1.create_message_controller)(data);
            if (new_messge === null || new_messge === void 0 ? void 0 : new_messge.success) {
                io.to(data.conversation_id).emit(`${data.conversation_id}`, new_messge);
            }
        }));
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
exports.init = init;
