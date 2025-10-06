import { DataTypes, Model } from 'sequelize';
import { db } from '../dbs';
import { User } from './index';
import { Position } from '../enum';

class PaidLeaveRequest extends Model {
    public id!: string;
    public reason!: string;
    public user_id!: string;
    public leader_id!: string;
    public admin_id!: string;
    public is_confirm!: boolean;
    public is_approve!: boolean;
    public date_request!: string;
    public date_leave!: string;
    public is_paid!: boolean;
    public is_half!: boolean;
    public feedback!: string;
    public position!: string;

    public user!: User;
}

PaidLeaveRequest.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
        is_approve: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        is_half: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        admin_id: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        date_request: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_leave: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.ENUM,
            values: Object.values(Position).map(value => value.toString()),
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
        is_paid: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    },
    {
        sequelize: db,
        modelName: 'paidleaverequest',
        tableName: 'paidleaverequests',
        timestamps: true,
        // paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default PaidLeaveRequest;
