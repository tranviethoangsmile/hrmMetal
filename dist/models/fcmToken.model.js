"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
const db_1 = __importDefault(require("../dbs/db"));
const device_type_enum_1 = require("../enum/device_type.enum");
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
        values: Object.values(device_type_enum_1.Device).map(device => device),
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
    sequelize: db_1.default,
    modelName: 'fcmToken',
    tableName: 'fcm_tokens',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = FcmToken;
