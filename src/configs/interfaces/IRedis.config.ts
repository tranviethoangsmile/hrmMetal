interface IRedisConfig {
    host: string;
    port: number;
    password?: string;
    maxRetriesPerRequest?: number;
    retryDelayOnFailover?: number;
    connectTimeout?: number;
    enableReadyCheck?: boolean;
    maxLoadingRetryTime?: number;
}

export default IRedisConfig;
