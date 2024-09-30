"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../dbs/db"));
const enum_1 = require("../enum");
class GroupMember extends sequelize_1.Model {
}
GroupMember.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    conversation_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    joined_at: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        values: Object.values(enum_1.groupMemberRole).map(value => value.toString()),
    },
}, {
    sequelize: db_1.default,
    modelName: 'groupmember',
    tableName: 'groupmembers',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = GroupMember;
