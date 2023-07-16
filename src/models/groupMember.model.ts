import { Model, DataTypes } from 'sequelize';
import db from '../dbs/db';
import Message from './message.model';

class GroupMember extends Model {
    public id!: string;
    public user_id!: string;
    public conversation_id!: string;
    public joined_datetime!: string;
}

GroupMember.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        conversation_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        joined_datetime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'groupmember',
        tableName: 'groupmembers',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default GroupMember;
