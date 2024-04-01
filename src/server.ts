import express, { Application } from 'express';
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
// require('./dbs/db.mongo');
dotenv.config();
const PORT = config.app.port;
const HOSTNAME = process.env.HOST_SERVER || '';
const app: Application = express();
const server = http.createServer(app);
const corsOptions = {
    origin: ['http://localhost:3000', 'https://hrm-admin-page.pages.dev'],
};
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', *);
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

init(server);
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(router);
server.listen(PORT, () => {
    console.warn(`server runing on port ${HOSTNAME}:${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.warn(`server closed`);
    });
});
