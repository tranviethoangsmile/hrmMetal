import { Model, DataTypes } from 'sequelize';
import db from '../dbs/db';

class DeleteMessage extends Model {
    public id!: string;
    public message_id!: string;
    public user_id!: string;
}

DeleteMessage.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        message_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'delete_message',
        tableName: 'delete_messages',
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default DeleteMessage;
