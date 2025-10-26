import express, {
    Application,
    Request,
    Response,
    NextFunction,
    Express,
} from 'express';
import cors from 'cors';
import router from './routers';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import Redis from 'ioredis';
import http from 'http';
import { init } from './socket/socketIO';
import config from './configs/config/config.system';
import swaggerDocs from './swagger/swagger.config';
import { apiRateLimiter } from './middlewares/rateLimit.config';
import { initRedis } from './dbs/redis';
// require('./dbs/db.mongo');
dotenv.config();

// Khởi tạo Redis connection
initRedis();

const PORT = config.app.port;
const HOSTNAME = process.env.HOST_SERVER || 'localhost';
const app: Application = express();
const server = http.createServer(app);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With, content-type, Authorization',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
swaggerDocs(app as Express, PORT);
init(server);
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json({ limit: '100mb' }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(apiRateLimiter);
app.use(router);
initRedis();
server.listen(PORT, () => {
    console.warn(`server runing on port ${HOSTNAME}:${PORT}`);
});
process.title = 'node 4000';

process.on('SIGINT', () => {
    server.close(() => {
        console.warn(`server closed`);
    });
});
