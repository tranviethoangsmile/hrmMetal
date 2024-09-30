"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../dbs/db"));
const sequelize_1 = require("sequelize");
const enum_1 = require("../enum");
class PlanProduction extends sequelize_1.Model {
}
PlanProduction.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    position: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(enum_1.Position).map(value => value.toString()),
    },
    department_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    production_line: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    product: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(enum_1.Products).map(value => value.toString()),
    },
    work_shift: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(enum_1.shift_work).map(value => value.toString()),
    },
    operation_time: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    is_custom: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'PlanProduction',
    tableName: 'planproductions',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});
exports.default = PlanProduction;
