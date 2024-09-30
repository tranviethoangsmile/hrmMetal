"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../dbs/db"));
const Role_enum_1 = require("../enum/Role.enum");
const Position_enum_1 = require("../enum/Position.enum");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    begin_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dob: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    ic_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    employee_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    salary_hourly: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    shift_night_pay: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    travel_allowance_pay: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    paid_days: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    is_officer: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    is_offical_staff: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    is_admin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(Role_enum_1.Role).map(value => value.toString()),
    },
    position: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(Position_enum_1.Position).map(value => value.toString()),
    },
    department_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'users',
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = User;
