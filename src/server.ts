import express, { Application, application, Request, Response } from 'express';
import cors from 'cors';
import router from './routers';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import http from 'http';
import { init } from './socket/socketIO';
import config from './configs/config.system';
require('./dbs/db.mongo');
dotenv.config();
const PORT = config.app.port || 4000;
const HOSTNAME = '192.168.0.108';
const app: Application = express();
const server = http.createServer(app);
init(server);
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(router);
console.log(PORT);
server.listen(PORT, () => {
    console.warn(`server runing on port ${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.warn(`server closed`);
    });
});
