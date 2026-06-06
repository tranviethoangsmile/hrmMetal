"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbs_1 = require("../dbs");
class Conversation extends sequelize_1.Model {
}
Conversation.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'New chat',
    },
    member_count: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 2,
    },
}, {
    sequelize: dbs_1.db,
    modelName: 'conversation',
    tableName: 'conversations',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = Conversation;
