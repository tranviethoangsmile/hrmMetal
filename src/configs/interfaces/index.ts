import IAppConfig from './IApp.config';
import IRedisConfig from './IRedis.config';
import IDbConfig from './IDbConfig.config';
interface IConfig {
    app: IAppConfig;
    db: IDbConfig;
}
export {
    IConfig,
    IRedisConfig,
};
