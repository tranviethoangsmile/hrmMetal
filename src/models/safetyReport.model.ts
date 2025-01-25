import { Model, DataTypes } from 'sequelize';
import db from '../dbs/db';

class SafetyReport extends Model {
    public id!: string;
    public user_id!: string;
    public leader_id!: string;
    public title!: string;
    public content!: string;
    public is_confirm!: boolean;
    public date!: string;
}

SafetyReport.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
    },
    {
        sequelize: db,
        modelName: 'safetyReport',
        tableName: 'safety_reports',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);
