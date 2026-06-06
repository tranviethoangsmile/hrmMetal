"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbs_1 = require("../dbs");
const index_1 = require("./index");
class SafetyReport extends sequelize_1.Model {
}
SafetyReport.init({
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
    leader_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: index_1.User,
            key: 'id',
        },
    },
    department_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: index_1.Department,
            key: 'id',
        },
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    solution: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    corrective_action: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    media_path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    is_confirm: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: dbs_1.db,
    modelName: 'safetyReport',
    tableName: 'safety_reports',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = SafetyReport;
