import { Model, DataTypes } from 'sequelize';
import { db } from '../dbs';
import { User, Department } from './index';

class SafetyReport extends Model {
    public id!: string;
    public user_id!: string;
    public leader_id!: string;
    public department_id!: string;
    public title!: string;
    public content!: string;
    public solution!: string;
    public corrective_action!: string;
    public media_path!: string;
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
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        leader_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: User,
                key: 'id',
            },
        },
        department_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Department,
                key: 'id',
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        solution: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        corrective_action: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        media_path: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_confirm: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
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

export default SafetyReport;
