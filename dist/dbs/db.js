'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_system_1 = __importDefault(require("../configs/config.system"));
const CONFIG = config_system_1.default.db;
const db = new sequelize_1.Sequelize(CONFIG.name, CONFIG.username, CONFIG.password, {
    dialect: CONFIG.dialect,
    host: CONFIG.host,
    logging: false,
    port: CONFIG.port,
    timezone: CONFIG.timezone,
});
db.authenticate()
    .then(() => console.log('Connection into database hrmMetal successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err.message));
exports.default = db;
