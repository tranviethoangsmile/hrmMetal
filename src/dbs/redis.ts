import Redis from 'ioredis';
import { redisConfig } from '../configs';

const statusConnectRedis = {
    CONNECTED: 'connect',
    READY: 'ready',
    RECONNECTING: 'reconnecting',
    ERROR: 'error',
    END: 'end',
}

let listenersAttached = false

const redis = new Redis({
    host: redisConfig.host,
    port: redisConfig.port,
    password: redisConfig.password,
    maxRetriesPerRequest: redisConfig.maxRetriesPerRequest,
    connectTimeout: redisConfig.connectTimeout,
    enableReadyCheck: redisConfig.enableReadyCheck,
    maxLoadingRetryTime: redisConfig.maxLoadingRetryTime,
});

const attachListeners = () => {
    if (listenersAttached) return;
    listenersAttached = true;
    redis.on(statusConnectRedis.CONNECTED as any, () => {
        console.log('Redis connected');
    });
    redis.on(statusConnectRedis.READY as any, () => {
        console.log('Redis ready');
        // Kiểm tra replication mode
        redis.info('replication').then(info => {
            const lines = info.split('\n');
            const role = lines.find(line => line.startsWith('role:'));
            console.log('Redis mode:', role);
        }).catch(err => {
            console.error('Failed to get Redis info:', err);
        });
    });
    redis.on(statusConnectRedis.RECONNECTING as any, () => {
        console.log('Redis reconnecting');
    });
    redis.on(statusConnectRedis.ERROR as any, err => {
        console.error('Redis error:', err);
    });
    redis.on(statusConnectRedis.END as any, () => {
        console.warn('Redis connection ended');
    });
}

const initRedis = () => {
    attachListeners();
    return redis;
};

const getRedis = () => redis;

const closeRedis = async () => {
    try {
        await redis.quit();
    } catch (e) {
        // ignore
    }
}

attachListeners();

export default redis;
export { initRedis, getRedis, closeRedis }
