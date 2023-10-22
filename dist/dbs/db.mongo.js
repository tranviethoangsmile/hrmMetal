'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const check_connect_1 = require("../heplpers/check.connect");
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL;
const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME;
class Database {
    constructor() {
        this.connect();
    }
    connect() {
        if (1 === 1) {
            mongoose_1.default.set('debug', true);
            mongoose_1.default.set('debug', { color: true });
        }
        mongoose_1.default
            .connect(MONGO_URL)
            .then(_ => console.log(`connected mongodb, ${(0, check_connect_1.numConnection)()}`))
            .catch(err => console.log('connect err' + err));
    }
    static getInstance() {
        if (!(Database === null || Database === void 0 ? void 0 : Database.instance)) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
