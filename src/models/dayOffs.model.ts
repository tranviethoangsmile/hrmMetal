import db from '../dbs/db';
import { DataTypes, Model } from 'sequelize';

class DayOffs extends Model {
    public id!: string;
    public date!: string;
}

DayOffs.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        sequelize: db,
        tableName: 'day_offs',
        paranoid: true,
        timestamps: true,
        modelName: 'dayOffs',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default DayOffs;
