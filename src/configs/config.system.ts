import { Dialect } from '../enum/dialect.enum';
import dotenv from 'dotenv';
dotenv.config();
const ENV = process.env;
interface AppConfig {
    port: number;
}

interface DbConfig {
    host: string;
    port: number;
    name: string;
    dialect: Dialect;
    username: string;
    password: string;
}
interface Config {
    app: AppConfig;
    db: DbConfig;
}

const pro: Config = {
    app: {
        port: parseInt(ENV.PRO_PORT!),
    },
    db: {
        host: ENV.PRO_HOST!,
        port: parseInt(ENV.PRO_DB_PORT!),
        name: ENV.PRO_DB_NAME!,
        dialect: Dialect.POSTGRES,
        username: ENV.PRO_DB_USERNAME!,
        password: ENV.PRO_DB_PASSWORD!,
    },
};

const dev: Config = {
    app: {
        port: parseInt(ENV.DEV_PORT!),
    },
    db: {
        host: ENV.DEV_HOST!,
        port: parseInt(ENV.DEV_DB_PORT!),
        name: ENV.DEV_DB_NAME!,
        dialect: Dialect.POSTGRES,
        username: ENV.DEV_DB_USERNAME!,
        password: ENV.DEV_DB_PASSWORD!,
    },
};

const config = ENV.NODE_ENV === 'dev' ? dev : pro;

export default config;
