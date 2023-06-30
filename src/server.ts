import express, { Application, application, Request, Response } from 'express';
import cors from 'cors';
import router from './routers';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import config from './configs/config.system';
require('./dbs/db.mongo');
dotenv.config();
const PORT = config.app.port;
const HOSTNAME = '192.168.1.21';
const App = express();

App.use(cors());
App.use(morgan('combined'));
App.use(helmet());
App.use(compression());
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(bodyParser.json());
App.use(express.static('public'));
App.use(router);

const server = App.listen(PORT, () => {
    console.warn(`server runing on port ${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.warn(`server closed`);
    });
});
