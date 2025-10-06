import dotenv from 'dotenv';
import { IRedisConfig } from '../interfaces';
dotenv.config();
const ENV = process.env;
const redisConfig: IRedisConfig = {
    host: ENV.REDIS_HOST || 'localhost',
    port: ENV.REDIS_PORT ? parseInt(ENV.REDIS_PORT) : 6379,
    password: ENV.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: ENV.REDIS_MAX_RETRIES_PER_REQUEST
        ? parseInt(ENV.REDIS_MAX_RETRIES_PER_REQUEST)
        : 5,
    retryDelayOnFailover: ENV.REDIS_RETRY_DELAY_ON_FAILOVER
        ? parseInt(ENV.REDIS_RETRY_DELAY_ON_FAILOVER)
        : 100,
    connectTimeout: ENV.REDIS_CONNECT_TIMEOUT
        ? parseInt(ENV.REDIS_CONNECT_TIMEOUT)
        : 10000,
    enableReadyCheck: ENV.REDIS_ENABLE_READY_CHECK
        ? ENV.REDIS_ENABLE_READY_CHECK.toLowerCase() === 'true'
        : true,
    maxLoadingRetryTime: ENV.REDIS_MAX_LOADING_RETRY_TIME
        ? parseInt(ENV.REDIS_MAX_LOADING_RETRY_TIME)
        : 10000,
};
export default redisConfig;
