'use strict';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { numConnection } from '../heplpers/checkConnectDb/check.connect';
dotenv.config();
const MONGO_URL: string = process.env.MONGO_URL! || 'mongodb://localhost:27017';
const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME;

class Database {
    static instance: any;
    constructor() {
        this.connect();
    }

    connect() {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }

        mongoose
            .connect(MONGO_URL)
            .then(_ => console.log(`connected mongodb, ${numConnection()}`))
            .catch(err => console.log('connect err' + err));
    }
    static getInstance() {
        if (!Database?.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
