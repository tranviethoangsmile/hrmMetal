"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../dbs/db"));
const codeError_enum_1 = require("../enum/codeError.enum");
class CodeError extends sequelize_1.Model {
}
CodeError.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    code: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(codeError_enum_1.CodeError).map(value => value.toString()),
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    shutdown_time: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    daily_report_id: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: db_1.default,
    modelName: 'codeerrors',
    tableName: 'codeerrors',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = CodeError;
