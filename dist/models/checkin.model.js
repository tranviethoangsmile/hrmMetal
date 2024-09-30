"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../dbs/db"));
const sequelize_1 = require("sequelize");
const shift_work_enum_1 = require("../enum/shift_work.enum");
class Checkin extends sequelize_1.Model {
}
Checkin.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    time_in: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    time_out: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    work_time: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    go_out: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    go_in: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    over_time: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    is_weekend: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    work_shift: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(shift_work_enum_1.shift_work).map(value => value.toString()),
    },
    is_checked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    is_paid_leave: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: db_1.default,
    paranoid: true,
    timestamps: true,
    modelName: 'checkin',
    tableName: 'checkins',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = Checkin;
