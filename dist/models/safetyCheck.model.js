"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbs_1 = require("../dbs");
const sequelize_1 = require("sequelize");
class SafetyChecks extends sequelize_1.Model {
}
SafetyChecks.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    event_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    is_safety: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    feedback: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    is_at_home: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    is_can_work: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: dbs_1.db,
    modelName: 'safety_checks',
    tableName: 'safety_checks',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = SafetyChecks;
