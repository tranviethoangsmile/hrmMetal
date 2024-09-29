import { DataTypes, Model } from 'sequelize';
import { User } from './index';
import db from '../dbs/db';
import { Device } from '../enum/device_type.enum';

class FcmToken extends Model {
    public id!: string;
    public user_id!: string;
    public fcm_token!: string;
    public device_type!: Enumerator;
    public app_version!: string;
    public device_id!: string;
}

FcmToken.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        fcm_token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        device_type: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: Object.values(Device).map(device => device),
        },
        app_version: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        device_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'fcmToken',
        tableName: 'fcm_tokens',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default FcmToken;
