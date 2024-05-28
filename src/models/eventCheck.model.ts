import db from '../dbs/db';
import { DataTypes, Model } from 'sequelize';

class EventChecks extends Model {
    public id!: string;
    public user_id!: string;
    public event_id!: string;
    public is_confirm!: boolean;
}

EventChecks.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        event_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        is_confirm: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize: db,
        modelName: 'event_checks',
        tableName: 'event_checks',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default EventChecks;
