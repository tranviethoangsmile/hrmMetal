import { Dialect } from '../../enum';
interface IDbConfig {
    host: string;
    port: number;
    name: string;
    dialect: Dialect;
    username: string;
    password: string;
    timezone: string;
}
export default IDbConfig;
