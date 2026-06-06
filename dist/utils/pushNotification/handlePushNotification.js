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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ENV = process.env;
const serviceAccount = {
    projectId: ENV.FB_PROJECT_ID,
    privateKey: (_a = ENV.FB_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n'),
    clientEmail: ENV.FB_CLIENT_MAIL,
};
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
});
const sendPushNotification = ({ fcmToken, title, body, key, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fcmToken || !title || !body) {
        return;
    }
    const message = {
        notification: {
            title: title,
            body: body,
        },
        token: fcmToken,
        data: {
            click_action: 'MESSAGE',
            key: key,
        },
    };
    try {
        return yield firebase_admin_1.default.messaging().send(message);
    }
    catch (error) {
        console.error('Error sending message:', error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.default = sendPushNotification;
