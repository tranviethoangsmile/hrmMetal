"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../dbs/db"));
const Position_enum_1 = require("../enum/Position.enum");
class Information extends sequelize_1.Model {
}
Information.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    media: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    position: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(Position_enum_1.Position).map(value => value.toString()),
    },
    is_video: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    is_event: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    is_public: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'information',
    tableName: 'informations',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = Information;
