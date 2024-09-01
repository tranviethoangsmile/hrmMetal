import { Model, DataTypes } from 'sequelize';
import db from '../dbs/db';
import { groupMemberRole } from '../enum';

class GroupMember extends Model {
    public id!: string;
    public user_id!: string;
    public conversation_id!: string;
    public joined_at!: string;
    public role!: Enumerator;
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
        joined_at: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            values: Object.values(groupMemberRole).map(value =>
                value.toString(),
            ),
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
