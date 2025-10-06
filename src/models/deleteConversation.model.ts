import { Model, DataTypes } from 'sequelize';
import { db } from '../dbs';

class DeleteConversation extends Model {
    public id!: string;
    public conversation_id!: string;
    public user_id!: string;
}

DeleteConversation.init(
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
        conversation_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'delete_conversation',
        tableName: 'delete_conversations',
        timestamps: true,
        // paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
);

export default DeleteConversation;
