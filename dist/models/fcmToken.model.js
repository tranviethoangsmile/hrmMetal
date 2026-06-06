"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const dbs_1 = require("../dbs");
const enum_1 = require("../enum");
class FcmToken extends sequelize_1.Model {
}
FcmToken.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: index_1.User,
            key: 'id',
        },
    },
    fcm_token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    device_type: {
        type: sequelize_1.DataTypes.ENUM,
        allowNull: false,
        values: Object.values(enum_1.Device).map(device => device),
    },
    app_version: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    device_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: dbs_1.db,
    modelName: 'fcmToken',
    tableName: 'fcm_tokens',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = FcmToken;
