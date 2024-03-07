import db from '../dbs/db';
import { DataTypes, Model } from 'sequelize';
import { User } from './index';

class PaidLeaveRequest extends Model {
    public id!: string;
    public reason!: string;
    public user_id!: string;
    public leader_id!: string;
    public admin_id!: string;
    public is_confirm!: boolean;
    public is_active!: boolean;
    public date_to!: string;
    public date_from!: string;

    public user!: User;
}

PaidLeaveRequest.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        leader_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        admin_id: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        date_from: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_to: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        feedback: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_confirm: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
    },
    {
        sequelize: db,
        modelName: 'paidleaverequest',
        tableName: 'paidleaverequests',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default PaidLeaveRequest;
