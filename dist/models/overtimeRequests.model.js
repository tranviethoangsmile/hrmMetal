"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbs_1 = require("../dbs");
const index_1 = require("./index");
const enum_1 = require("../enum");
class OvertimeRequest extends sequelize_1.Model {
}
OvertimeRequest.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
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
        allowNull: false,
        references: {
            model: index_1.User,
            key: 'id',
        },
    },
    admin_id: {
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
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    overtime_hours: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(enum_1.OVERTIME_REQUEST_HOUR).map(value => value.toString())),
        allowNull: false,
    },
    position: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(enum_1.Position).map(value => value.toString())),
        allowNull: false,
    },
    is_confirm: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    is_approved: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: dbs_1.db,
    modelName: 'overtime_request',
    tableName: 'overtime_requests',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = OvertimeRequest;
