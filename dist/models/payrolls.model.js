"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../dbs/db"));
class Payroll extends sequelize_1.Model {
}
Payroll.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    pay_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    work_time: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    over_time: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    paid_vacation_days: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    weekend_time: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    paid_vacation_pay: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    work_salary: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    shift_night_salary: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    over_time_salary: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    refund_money: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    other_pay: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    weekend_salary: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    attendance_allowance_pay: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    travel_allowance_pay: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    bonus_pay: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    gross_salary: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    income_tax: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    social_insurance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    health_insurance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    uniform_deduction: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    accident_insurance: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    club_fee: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    rent_home: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    cost_of_living: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    other_deduction: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    shift_night: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    net_salary: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Payroll',
    tableName: 'payrolls',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = Payroll;
