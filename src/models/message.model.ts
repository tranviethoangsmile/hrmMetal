import { Model, DataTypes } from 'sequelize';
import db from '../dbs/db';

class Message extends Model {
    public id!: string;
    public conten!: string;
    public sender_id!: string;
    public conversation_id!: string;
}

Message.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sender_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        conversation_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'message',
        tableName: 'messages',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default Message;
