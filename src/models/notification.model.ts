import { Model, DataTypes } from 'sequelize';
import db from '../dbs/db';
import { User } from '../models';
import { notification_type } from '../enum';

class Notification extends Model {
    public id!: string;
    public user_id!: string;
    public title!: string;
    public message!: string;
    public is_readed!: boolean;
    public type!: Enumerator;
}

Notification.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
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
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_readed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            values: Object.values(notification_type).map(value =>
                value.toString(),
            ),
        },
    },
    {
        sequelize: db,
        modelName: 'Notification',
        tableName: 'notifications',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default Notification;
