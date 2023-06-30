import db from '../dbs/db';
import { DataTypes, Model } from 'sequelize';
import { User } from './index';

class PaidLeaveRequest extends Model {
    public id!: string;
    public date!: string;
    public reason!: string;
    public staff_id!: string;
    public leader_id!: string;
    public is_active!: boolean;

    public user!: User;
}

PaidLeaveRequest.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        staff_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        leader_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
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
