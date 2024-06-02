import db from '../dbs/db';
import { DataTypes, Model } from 'sequelize';
import { Position } from '../enum/Position.enum';
class Events extends Model {
    public id!: string;
    public name!: string;
    public description!: string;
    public date_start!: string;
    public date_end!: string;
    public position!: Enumerator;
    public media!: string;
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
        date_start: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_end: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.ENUM,
            values: Object.values(Position).map(value => value.toString()),
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        media: {
            type: DataTypes.STRING,
            allowNull: true,
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
