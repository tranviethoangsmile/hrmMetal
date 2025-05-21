import { Model, DataTypes } from 'sequelize';
import db from '../dbs/db';
import { User, Department } from './index';
import { Position, OVERTIME_REQUEST_HOUR } from '../enum';

class OvertimeRequest extends Model {
    public id!: string;
    public user_id!: string;
    public leader_id!: string;
    public admin_id!: string;
    public department_id!: string;
    public date!: string;
    public reason!: string;
    public overtime_hours!: number;
    public position!: Position;
    public is_confirm!: boolean;
    public is_approved!: boolean;
    public user!: User;
    public department!: Department;
}

OvertimeRequest.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
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
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        admin_id: {
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
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        overtime_hours: {
            type: DataTypes.ENUM(
                ...Object.values(OVERTIME_REQUEST_HOUR).map(value =>
                    value.toString(),
                ),
            ),
            allowNull: false,
        },
        position: {
            type: DataTypes.ENUM(
                ...Object.values(Position).map(value => value.toString()),
            ),
            allowNull: false,
        },
        is_confirm: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_approved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize: db,
        modelName: 'overtime_request',
        tableName: 'overtime_requests',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default OvertimeRequest;
