"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbs_1 = require("../dbs");
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
    sequelize: dbs_1.db,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = Notification;
