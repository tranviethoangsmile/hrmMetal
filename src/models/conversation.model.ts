import { Model, DataTypes } from 'sequelize';
import db from '../dbs/db';

class Conversation extends Model {
    public id!: string;
    public name!: string;
}

Conversation.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'new chat',
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
