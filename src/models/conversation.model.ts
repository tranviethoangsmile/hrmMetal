import { Model, DataTypes } from 'sequelize';
import { db } from '../dbs';

class Conversation extends Model {
    public id!: string;
    public title!: string;
    public member_count!: number;
}

Conversation.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'New chat',
        },
        member_count: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 2,
        },
    },
    {
        sequelize: db,
        modelName: 'conversation',
        tableName: 'conversations',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default Conversation;
