"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../dbs/db"));
const sequelize_1 = require("sequelize");
class PaidLeaveRequest extends sequelize_1.Model {
}
PaidLeaveRequest.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV1,
        primaryKey: true,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    reason: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    staff_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    leader_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
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
