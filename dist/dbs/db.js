'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configs_1 = require("../configs");
const CONFIG = configs_1.config.db;
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
