import IAppConfig from './IApp.config';
import IDbConfig from './IDbConfig.config';
import IRedisConfig from './IRedis.config';
interface IConfig {
    app: IAppConfig;
    db: IDbConfig;
}
export { IConfig, IRedisConfig };
