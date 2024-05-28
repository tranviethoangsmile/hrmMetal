import db from '../dbs/db';
import { DataTypes, Model } from 'sequelize';

class Events extends Model {
    public id!: string;
    public name!: string;
    public description!: string;
    public is_safety!: boolean;
    public is_active!: boolean;
}

Events.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_safety: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize: db,
        paranoid: true,
        timestamps: true,
        modelName: 'events',
        tableName: 'events',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default Events;
