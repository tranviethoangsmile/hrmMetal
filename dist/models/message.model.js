"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbs_1 = require("../dbs");
const enum_1 = require("../enum");
class Message extends sequelize_1.Model {
}
Message.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    conversation_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    is_unsend: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    message_type: {
        type: sequelize_1.DataTypes.ENUM,
        allowNull: false,
        values: Object.values(enum_1.E_message_type).map(value => value.toString()),
    },
}, {
    sequelize: dbs_1.db,
    modelName: 'message',
    tableName: 'messages',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = Message;
