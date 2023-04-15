'use strict';
import { Sequelize } from 'sequelize';
import config from '../configs/config.system';
const CONFIG = config.db;
const db = new Sequelize(CONFIG.name, CONFIG.username, CONFIG.password, {
    dialect: CONFIG.dialect,
    host: CONFIG.host,
    logging: false,
    port: CONFIG.port,
    // timezone: TIMEZONE
});

db.authenticate()
    .then(() => console.log('Connection into database hrmMetal successfully.'))
    .catch(err =>
        console.error('Unable to connect to the database:', err.message),
    );

export default db;
