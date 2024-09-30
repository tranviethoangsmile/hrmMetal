"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../dbs/db"));
const sequelize_1 = require("sequelize");
const Position_enum_1 = require("../enum/Position.enum");
class PaidLeaveRequest extends sequelize_1.Model {
}
PaidLeaveRequest.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
        primaryKey: true,
    },
    reason: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    leader_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    is_approve: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    is_half: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    admin_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
    date_request: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date_leave: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(Position_enum_1.Position).map(value => value.toString()),
    },
    feedback: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    is_confirm: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    is_paid: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
}, {
    sequelize: db_1.default,
    modelName: 'paidleaverequest',
    tableName: 'paidleaverequests',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = PaidLeaveRequest;
