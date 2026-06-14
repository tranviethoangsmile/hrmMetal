import { Model, DataTypes, JSONB } from "sequelize";
import User from "./user.model";
import { db } from "../dbs";
import { LOGS_ACTION_ENUM } from "../enum";


class AuditLogs extends Model {
    public id!: string;
    public actor_id!: string;
    public actor_name!: string;
    public action!: string;
    public resource_type!: string;
    public resource_id!: string;
    public old_value!: typeof JSONB;
    public new_value!: typeof JSONB;
    public ip_address!: string;
}

AuditLogs.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true, 
    },
    actor_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    },
    actor_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    action: {
        type: DataTypes.ENUM,
        values: Object.values(LOGS_ACTION_ENUM).map(value => value.toString()),
        allowNull: false
    },
    resource_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resource_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    old_value: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    new_value : {
        type: DataTypes.JSONB,
        allowNull: false
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    sequelize: db,
    paranoid: true,
    timestamps: true,
    modelName: 'AuditLogs',
    tableName: 'audit_logs',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
})

export default AuditLogs;