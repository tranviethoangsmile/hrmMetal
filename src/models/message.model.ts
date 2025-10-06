import { Model, DataTypes } from 'sequelize';
import { db } from '../dbs';
import { E_message_type } from '../enum';

class Message extends Model {
    public id!: string;
    public message!: string;
    public user_id!: string;
    public conversation_id!: string;
    public is_unsend!: boolean;
    public message_type!: Enumerator;
}

Message.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        conversation_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        is_unsend: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        message_type: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: Object.values(E_message_type).map(value =>
                value.toString(),
            ),
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
