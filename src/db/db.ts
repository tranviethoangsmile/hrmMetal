import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const ENV = process.env;
const DATABASE_NAME = ENV.DATABASE_NAME || '';
const DB_USER_NAME = ENV.DB_USER_NAME || '';
const DB_PASSWORD = ENV.DB_PASSWORD || '';
const DB_HOST = ENV.DB_HOST || '';
const DB_DIALECT = ENV.DB_DIALECT || 'postgres';

const db = new Sequelize(DATABASE_NAME, DB_USER_NAME, DB_PASSWORD, {
    dialect: 'postgres',
    host: DB_HOST,
    logging: false,
});

db.authenticate()
    .then(() => console.log('Connection into database hrmMetal successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err.message));


export default db;