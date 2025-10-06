import { redis } from '../../dbs';

const setCache = async (key: string, value: string, expiration: number) => {
    await redis.set(key, value, 'EX', expiration);
};
const getCache = async (key: string): Promise<string | null> => {
    return await redis.get(key);
};

const delCache = async (key: string): Promise<number> => {
    return await redis.del(key);
};

export { setCache, getCache, delCache };
