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
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ENV = process.env;
const serviceAccount = ENV.FIREBASE_CONFIG
    ? JSON.parse(ENV.FIREBASE_CONFIG)
    : {};
console.log(serviceAccount);
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
});
const sendPushNotification = ({ fcmToken, title, body }) => __awaiter(void 0, void 0, void 0, function* () {
    const message = {
        notification: {
            title: title,
            body: body,
        },
        token: fcmToken,
        data: {
            click_action: 'OPEN_ACTIVITY',
        },
    };
    try {
        const response = yield firebase_admin_1.default.messaging().send(message);
        console.log('Successfully sent message:', response);
    }
    catch (error) {
        console.error('Error sending message:', error);
    }
});
exports.default = sendPushNotification;
