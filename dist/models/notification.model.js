"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../dbs/db"));
const models_1 = require("../models");
const enum_1 = require("../enum");
class Notification extends sequelize_1.Model {
}
Notification.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: models_1.User,
            key: 'id',
        },
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    is_readed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        values: Object.values(enum_1.notification_type).map(value => value.toString()),
    },
}, {
    sequelize: db_1.default,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = Notification;
