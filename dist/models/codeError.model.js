"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbs_1 = require("../dbs");
class CodeError extends sequelize_1.Model {
}
CodeError.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    code: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    shutdown_time: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    error_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    daily_report_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'dailyreports',
            key: 'id',
        },
    },
}, {
    sequelize: dbs_1.db,
    modelName: 'codeerrors',
    tableName: 'codeerrors',
    timestamps: true,
    // paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = CodeError;
